import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http/http.service';
import { CustomSidenavComponent } from "../../components/custom-sidenav/custom-sidenav.component";
import { CustomToolbarComponent } from "../../components/custom-toolbar/custom-toolbar.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { environment } from '../../../environments/environment';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgOptimizedImage } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { FanArtworksComponent } from './fan-artworks/fan-artworks.component';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [
    RouterLink,
    CustomSidenavComponent,
    CustomToolbarComponent,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    NgOptimizedImage,
    DetailsComponent,
    FanArtworksComponent
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
    ])
  ],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {
  @ViewChild(CustomSidenavComponent) drawer!: CustomSidenavComponent;
  @ViewChild('headerImage') headerImage!: ElementRef;

  characterData: any;
  id: number = 0;
  details: any[] = [];
  isLoading: boolean = true;
  headerImageLoaded: boolean = false;
  showScrollTopButton: boolean = false;

  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getCharacterData(this.id);
    });
  }

  getImageSource(id: number): string {
    try {
      const pngPath = `/assets/images/characters/${id}.png`;
      const img = new Image();
      img.src = pngPath;
      
      if (img.complete) {
        return pngPath;
      } else {
        return `/assets/images/characters/${id}.gif`;
      }
    } catch {
      return `/assets/images/characters/${id}.gif`;
    }
  }

  getCharacterData(id: number) {
    this.http.get(`https://j2hiihr9tj.execute-api.ap-southeast-1.amazonaws.com/dev/characters/get/${id}`).subscribe({
      next: (res: any) => {
        this.characterData = res.data;
        
        // Preload the image
        const img = new Image();
        img.onload = () => {
          this.headerImageLoaded = true;
          this.isLoading = false;
        };
        img.src = this.headerImagePath(this.characterData.character_img);
      },
      error: (err: any) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // show fab button when page is scrolled down 200px
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScrollTopButton = scrollPosition > 200;

    if (this.headerImage?.nativeElement) {
      const scrollPosition = window.scrollY;
      const scrollOffset = scrollPosition * 0.4;
      this.headerImage.nativeElement.style.setProperty('--scroll-offset', `${scrollOffset}px`);
    }
  }

  onSearch(keyword: string) {
    this.drawer.drawer.close();
    
    this.router.navigate(['/'], {
      queryParams: { search: keyword },
      queryParamsHandling: 'merge',
    })
  }

  headerImagePath(filename: string): string {
    return `${environment.assetBucketUrl}/splash-arts/${filename}`
  }

  pathIconPath(filename: string): string {
    return `${environment.assetBucketUrl}/path-icons/${filename}`
  }

  typeIconPath(filename: string): string {
    return `${environment.assetBucketUrl}/type-icons/${filename}`
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
