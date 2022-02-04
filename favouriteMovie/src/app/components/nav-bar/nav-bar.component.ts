import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: ['.navbar { z-index: 10; overflow: hidden; top: 0}'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  activLink: string = 'enter';
  subscription = new Subscription();

  constructor(protected movieService: MovieService, protected router: Router) {}

  navigateToPage(url: string) {
    this.activLink = url;
    this.router.navigate([url]);
  }

  ngOnInit(): void {
    this.subscription.add(
      this.movieService.activLink$
        .pipe(
          filter((activLink) => !!activLink),
          tap((activLink: string) => (this.activLink = activLink))
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
