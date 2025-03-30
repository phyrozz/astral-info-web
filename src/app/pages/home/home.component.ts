import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { CharacterListComponent } from "./character-list/character-list.component";
import { CustomToolbarComponent } from "../../components/custom-toolbar/custom-toolbar.component";
import { CustomSidenavComponent } from "../../components/custom-sidenav/custom-sidenav.component";
import { LIST_LIMIT } from '../../../constants';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CharacterListComponent,
    CustomToolbarComponent,
    CustomSidenavComponent,
    MatIconModule,
    MatButtonModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild(CustomSidenavComponent) drawer!: CustomSidenavComponent;

  characters: any[] = [];
  filters: any;
  isLoading: boolean = false;
  searchKeyword: string = '';
  limit: number = LIST_LIMIT;
  offset: number = 0;
  showScrollTopButton: boolean = false;

  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    // show fab button when page is scrolled down 200px
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScrollTopButton = scrollPosition > 200;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchKeyword = params['search'] || '';
      
      const queryParams = this.searchKeyword 
        ? { search: this.searchKeyword }
        : {};
        
      this.router.navigate([], {
        queryParams,
        queryParamsHandling: 'merge',
      });

      this.characters = [];
      this.offset = 0;
      this.limit = LIST_LIMIT;
      
      this.getCharacters();
    });
  }

  public getCharacters(filters: any = {}) {
    if (this.isLoading) return;

    this.isLoading = true;
    const data: any = {
      limit: this.limit,
      offset: this.offset,
      keyword: this.searchKeyword,
      filters: filters
    }

    this.http.post(`${environment.apiUrl}/characters/list`, data).subscribe({
      next: (res: any) => {
        this.characters = [...this.characters, ...res.data];
        // this.lastItemId = res.pagination.lastEvaluatedKey?.id;
        this.offset = res.pagination.offset;
        this.limit = res.pagination.limit;

        if (res.data.length !== 0) this.offset += this.limit;

        // if (!this.hasNextPage) this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onSearch(keyword: string) {
    this.characters = [];
    this.filters = {};
    
    this.router.navigate([], {
      queryParams: { search: keyword },
      queryParamsHandling: 'merge',
    })
  }

  onFilter(filters: any) {
    this.characters = [];
    this.isLoading = false;
    this.offset = 0;
    this.filters = filters;
    this.getCharacters(filters);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
