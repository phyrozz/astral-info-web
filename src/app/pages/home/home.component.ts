import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { CharacterListComponent } from "./character-list/character-list.component";
import { CustomToolbarComponent } from "../../components/custom-toolbar/custom-toolbar.component";
import { CustomSidenavComponent } from "../../components/custom-sidenav/custom-sidenav.component";
import { LIST_LIMIT } from '../../../constants';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CharacterListComponent,
    CustomToolbarComponent,
    CustomSidenavComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild(CustomSidenavComponent) drawer!: CustomSidenavComponent;

  characters: any[] = [];
  lastItemId?: number;
  hasNextPage: boolean = false;
  isLoading: boolean = false;
  searchKeyword: string = '';
  limit: number = LIST_LIMIT;
  offset: number = 0;

  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

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
      
      this.getCharacters(this.searchKeyword);
    });
  }

  public getCharacters(keyword: string = '') {
    if (this.isLoading) return;

    this.isLoading = true;
    const data: any = {
      // limit: LIST_LIMIT,
      // ...(this.lastItemId !== undefined && {
      //   lastEvaluatedKey: {
      //     id: this.lastItemId
      //   }
      // }),
      limit: this.limit,
      offset: this.offset,
      keyword: keyword
    }

    this.http.post("https://j2hiihr9tj.execute-api.ap-southeast-1.amazonaws.com/dev/characters/list", data).subscribe({
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
    this.drawer.drawer.close();
    this.characters = [];
    this.lastItemId = undefined;
    this.hasNextPage = false;
    
    this.router.navigate([], {
      queryParams: { search: keyword },
      queryParamsHandling: 'merge',
    })
  }
}
