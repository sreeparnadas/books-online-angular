import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BooksService} from '../services/books.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit{
  books = new Array<any>();


  constructor(private booksService: BooksService){}

  ngOnInit(): void {
      this.booksService.fetchAllBooks().subscribe();
      this.booksService.booksSubject.subscribe((books: any[]) => {
          this.books = books;
      });
  }


  onBookSelected(book: any){
    this.booksService.setSelectedBookData(book);
  }

}
