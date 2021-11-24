import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, map, Observable, of, filter, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rxjs';
  data: string = '';
  myobservable$: any;
  //myobservable$: Observable<number> | undefined;

  @ViewChild('input', { static: true }) input!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    //this.myobservable$ = of(1, 2, 3, 4, 5);
    this.myobservable$ = from([1, 2, 3, 4, 5]);

    // this.myobservable$ = fromEvent(this.input.nativeElement, 'keyup');

    // this.myobservable$.subscribe((data: any) => {
    //   this.http.post('https://jsonplaceholder.typicode.com/todos', data);
    // });

    this.myobservable$
      .pipe(
        tap((num) => {
          console.log('tap: ', num);
        }),
        filter((num: number) => num > 3),
        tap((num) => {
          console.log('tap: ', num);
        }),
        map((num: number) => num + 1),
        tap((num) => {
          console.log('tap: ', num);
        })
      )
      .subscribe((num: number) => console.log(num));

    //this.myobservable$.subscribe((num: number) => console.log(num));
  }
}
