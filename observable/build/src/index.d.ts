interface Observer<T> {
    next(value: T): void;
    error(err: any): void;
    complete(): void;
}
declare type Teardown = () => void;
declare class Subscriber<T> implements Observer<T> {
    private destination;
    private subscription;
    closed: boolean;
    constructor(destination: Observer<T>, subscription: Subscription);
    next(value: T): void;
    error(err: any): void;
    complete(): void;
}
declare class Subscription {
    private teardowns;
    add(teardown: Teardown): void;
    unsubscribe(): void;
}
declare class Observable<T> {
    private init;
    constructor(init: (observer: Observer<T>) => Teardown);
    subscribe(observer: Observer<T>): Subscription;
    lett<R>(fn: (source: Observable<T>) => Observable<R>): Observable<R>;
}
declare const map: <T, R>(fn: (vlaue: T) => R) => (source: Observable<T>) => Observable<R>;
declare const myObservable: Observable<number>;
declare const teardown: Subscription;
declare function pipe(...fns: Array<(source: Observable<any>) => Observable<any>>): (source: Observable<any>) => Observable<any>;
