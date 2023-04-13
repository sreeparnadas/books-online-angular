import { Component } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  selectedBook: any;

  constructor( private booksService: BooksService ) {}

  ngOnInit(): void {
    // this.selectedBook = this.booksService.getSelectedBookData();
    this.booksService.getSelectedBookData().subscribe(data => {
      this.selectedBook = data;
    });
  }
}
