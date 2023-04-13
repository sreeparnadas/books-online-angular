import { Injectable } from '@angular/core';
import {GlobalVariable} from '../shared/global';
import {HttpClient } from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";
import {Subject, BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books = new Array<any>();
  booksSubject = new Subject<any>();

  private selectedBookSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  fetchAllBooks(){
    return this.http.get<any>(GlobalVariable.BASE_API_URL  + '/books')
      .pipe(catchError((err:any) => {
        return err;
      }), tap(((response: {success: number, data: any}) => {
        this.books=response.data;
        this.booksSubject.next([...this.books]);
      })));
  }


  setSelectedBookData(data: any){
    this.selectedBookSubject.next(data)
  }

  getSelectedBookData(){
    return this.selectedBookSubject.asObservable();
  }
}
