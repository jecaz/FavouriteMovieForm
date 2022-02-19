import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./../../../styles/star-rating/star-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRatingComponent implements OnInit {
  @Output() activeRatingBar: EventEmitter<boolean> = new EventEmitter();
  selectedRating = 0;
  stars = [
    {
      id: 1,
      icon: 'fas fa-star',
      class: 'star-gray star-hover star',
    },
    {
      id: 2,
      icon: 'fas fa-star',
      class: 'star-gray star-hover star',
    },
    {
      id: 3,
      icon: 'fas fa-star',
      class: 'star-gray star-hover star',
    },
    {
      id: 4,
      icon: 'fas fa-star',
      class: 'star-gray star-hover star',
    },
    {
      id: 5,
      icon: 'fas fa-star',
      class: 'star-gray star-hover star',
    },
    {
      id: 6,
      icon: 'fas fa-star',
      class: 'star-gray star-hover star',
    },
    {
      id: 7,
      icon: 'fas fa-star',
      class: 'star-gray star-hover star',
    },
    {
      id: 8,
      icon: 'fas fa-star',
      class: 'star-gray star-hover star',
    },
    {
      id: 9,
      icon: 'fas fa-star',
      class: 'star-gray star-hover star',
    },
    {
      id: 10,
      icon: 'fas fa-star',
      class: 'star-gray star-hover star',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    const rating = +sessionStorage.getItem('selectedRating');
    if (rating) {
      this.selectStar(rating);
    }
  }

  selectStar(value): void {
    // prevent multiple selection
    if (this.selectedRating === 0) {
      this.stars.filter((star) => {
        if (star.id <= value) {
          star.class = 'star-gold star';
        } else {
          star.class = 'star-gray star';
        }
        return star;
      });
    }
    this.selectedRating = value;
  }

  closeStarRating() {
    if (this.selectedRating) {
      sessionStorage.setItem('selectedRating', this.selectedRating.toString());
    }
    this.activeRatingBar.emit(false);
  }
}
