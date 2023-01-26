import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  termino: string = '';
  debouncer: Subject<string> = new Subject();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(500)).subscribe((valor) => {
      this.router.navigateByUrl(`/search/${this.termino}`);
    });
  }

  search() {
    this.debouncer.next(this.termino);
  }
}
