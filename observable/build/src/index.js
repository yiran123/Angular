"use strict";
console.clear();
class Subscriber {
    constructor(destination, subscription) {
        this.destination = destination;
        this.subscription = subscription;
        this.closed = false;
        subscription.add(() => (this.closed = true));
    }
    next(value) {
        if (!this.closed) {
            this.destination.next(value);
        }
    }
    error(err) {
        if (!this.closed) {
            this.closed = true;
            this.destination.error(err);
            this.subscription.unsubscribe();
        }
    }
    complete() {
        if (!this.closed) {
            this.closed = true;
            this.destination.complete();
            this.subscription.unsubscribe();
        }
    }
}
class Subscription {
    constructor() {
        this.teardowns = [];
    }
    add(teardown) {
        this.teardowns.push(teardown);
    }
    unsubscribe() {
        for (const teardown of this.teardowns) {
            teardown();
        }
        this.teardowns = [];
    }
}
class Observable {
    constructor(init) {
        this.init = init;
    }
    subscribe(observer) {
        const subscription = new Subscription();
        const subscriber = new Subscriber(observer, subscription);
        subscription.add(this.init(subscriber));
        return subscription;
    }
    lett(fn) {
        return new Observable(s => {
            const subs = fn(this).subscribe(s);
            return () => {
                subs.unsubscribe();
            };
        });
    }
}
const map = (fn) => (source) => {
    return new Observable(subscriber => {
        const subs = source.subscribe({
            next(value) {
                subscriber.next(fn(value));
            },
            error(err) {
                subscriber.error(err);
            },
            complete() {
                subscriber.complete();
            },
        });
        return () => {
            subs.unsubscribe();
        };
    });
};
const myObservable = new Observable((observer) => {
    let i = 0;
    const id = setInterval(() => {
        observer.next(i++);
        if (i > 3) {
            observer.complete();
            observer.next(9999999);
        }
    }, 100);
    return () => {
        console.log('tearing down');
        clearInterval(id);
    };
});
const teardown = myObservable.lett(map(x => x + 100)).subscribe({
    next(value) {
        console.log(value);
    },
    error(err) {
        console.log(err);
    },
    complete() {
        console.log('done');
    },
});
setTimeout(() => {
    teardown.unsubscribe();
}, 2000);
function pipe(...fns) {
    return (source) => fns.reduce((prev, fn) => fn(prev), source);
}
//# sourceMappingURL=index.js.map