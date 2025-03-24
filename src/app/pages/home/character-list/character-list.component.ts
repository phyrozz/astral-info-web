import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

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
  @Input() hasNextPage: boolean = false;
  @Output() scrollEnd = new EventEmitter<void>();
  isLoading = true;
  private throttleTimeout: any = null;
  selectedId: number | null = null;

  constructor(
    private router: Router
  ) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (!this.hasNextPage) return;

    if (this.throttleTimeout) {
      return;
    }

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - 200) {
      this.isLoading = true;
      console.log('Scroll end reached!');
      
      this.scrollEnd.emit();
      
      // Prevent multiple emissions for 1 second
      this.throttleTimeout = setTimeout(() => {
        this.isLoading = false;
        this.throttleTimeout = null;
      }, 1000);
    }
  }

  async onCardClick(event: Event, characterId: number) {
    event.preventDefault();
    this.selectedId = characterId;
    
    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Navigate to character page
    this.router.navigate(['/character', characterId]);
  }

  imagePath(fileName: string): string {
    return `${environment.assetBucketUrl}/splash-arts/${fileName}`;
  }
}
