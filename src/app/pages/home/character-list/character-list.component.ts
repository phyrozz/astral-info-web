import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    NgOptimizedImage,
    MatProgressSpinnerModule,
    RouterLink
],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('expandFadeOut', [
      state('void', style({
        transform: 'scale(1)',
        opacity: 1,
        position: 'absolute'
      })),
      state('expanded', style({
        transform: 'scale(1.5)',
        opacity: 0,
        position: 'absolute'
      })),
      transition('void => expanded', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ])
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent {
  @Input() charactersData: any[] = [];
  @Input() loading: boolean = false;
  @Input() searchKeyword?: string;
  @Output() scrollEnd = new EventEmitter<void>();
  private throttleTimeout: any = null;
  selectedId: number | null = null;

  constructor(
    private router: Router
  ) {}

  private debounceTimeout: any = null;
  private readonly DEBOUNCE_TIME = 100;
  private readonly THROTTLE_TIME = 300;

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.throttleTimeout) {
      return;
    }

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (windowHeight + scrollTop >= documentHeight - 200) {
        this.loading = true;
        console.log('Scroll end reached!');
        
        this.scrollEnd.emit();
        
        this.throttleTimeout = setTimeout(() => {
          this.loading = false;
          this.throttleTimeout = null;
        }, this.THROTTLE_TIME);
      }
    }, this.DEBOUNCE_TIME);
  }

  async onCardClick(event: Event, characterId: number) {
    event.preventDefault();
    this.selectedId = characterId;
    
    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Navigate to character page
    this.router.navigate(['/character', characterId]);
  }

  imagePaths(fileName: string) {
    const highRes = `${environment.assetBucketUrl}/splash-arts/${fileName}`;
    const lowRes = `${environment.assetBucketUrl}/lowres-splash-arts/${fileName}`;

    return { lowRes, highRes };
  }

  highResLoaded: { [key: string]: boolean } = {};

  onHighResLoad(characterId: string | number) {
    this.highResLoaded[characterId] = true;
  }
}
