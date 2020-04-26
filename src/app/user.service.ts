import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subject = new BehaviorSubject<any>([]);
  public users$ = this.subject.asObservable();

  constructor(private http: HttpClient) { }

  init() {
    this.http.get('https://jsonplaceholder.typicode.com/users')
      .pipe(catchError(this.handleError))
      .subscribe(users => this.subject.next(users));
  }

  handleError(err: HttpErrorResponse) {
    console.log(err);
    console.log(err.message);
    
    
    return of(null);
  }

}
