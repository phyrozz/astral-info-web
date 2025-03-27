import { Component, HostListener, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../../../services/http/http.service';
import { NgOptimizedImage } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FanArtworkPreviewComponent } from '../fan-artwork-preview/fan-artwork-preview.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { ScreenSizeService } from '../../../services/screen-size/screen-size.service';

@Component({
  selector: 'app-fan-artworks',
  standalone: true,
  imports: [
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgOptimizedImage
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-out', style({ opacity: 1 }))
      ])
    ])
  ],
  templateUrl: './fan-artworks.component.html',
  styleUrl: './fan-artworks.component.scss'
})
export class FanArtworksComponent implements OnInit, OnDestroy {
  @Input() tagName?: string;

  readonly dialog = inject(MatDialog);
  fanArtworks: any[] = [];
  page: number = 1;
  private throttleTimeout: any = null;
  private debounceTimeout: any = null;
  private readonly DEBOUNCE_TIME = 150;
  private readonly THROTTLE_TIME = 500;
  loading: boolean = false;
  imageLoaded: { [key: number]: boolean } = {};
  $screenSize: string = 'desktop';

  constructor(
    private http: HttpService,
    private screenSize: ScreenSizeService
  ) { }

  ngOnInit(): void {
    this.screenSize.getScreenSize().subscribe(size => {
      this.$screenSize = size;
      console.log(size);
    });
    this.getFanArtworks(this.page);
  }

  ngOnDestroy(): void {
    clearTimeout(this.throttleTimeout);
    clearTimeout(this.debounceTimeout);
    this.fanArtworks = [];
    this.page = 1;
    this.loading = false;
  }

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

        this.page++;
        this.getFanArtworks(this.page);
        
        this.throttleTimeout = setTimeout(() => {
          this.loading = false;
          this.throttleTimeout = null;
        }, this.THROTTLE_TIME);
      }
    }, this.DEBOUNCE_TIME);
  }

  getFanArtworks(page: number) {
    this.http.get(environment.booruUrl, {
      tags: this.tagName,
      limit: 25,
      page: page
    }).subscribe({
      next: (response: any) => {
        // filter out items without media_asset or without variants
        const filteredResponse = response.filter((item: any) => 
          item.media_asset && 
          item.media_asset.variants && 
          Object.keys(item.media_asset.variants).length > 0
        );
        this.fanArtworks = [...this.fanArtworks, ...filteredResponse];
      },
      error: (error: any) => {
        console.error('Error fetching fan artworks:', error);
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  openPreview(imgSrc: string): void {
    const dialogRef = this.dialog.open(FanArtworkPreviewComponent, {
      data: { imgSrc: imgSrc },
      width: '80vw',
      height: '80vh',
      panelClass: 'no-padding-dialog',
      maxWidth: '100vw',
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  onImageLoad(artworkId: number) {
    this.imageLoaded[artworkId] = true;
  }

  gridCols() {
    if (this.$screenSize === 'mobile') {
      return 2;
    } else if (this.$screenSize === 'tablet') {
      return 4;
    } else {
      return 5;
    }
  }
}
