import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { CharacterListComponent } from "./character-list/character-list.component";
import { CustomToolbarComponent } from "../../components/custom-toolbar/custom-toolbar.component";
import { CustomSidenavComponent } from "../../components/custom-sidenav/custom-sidenav.component";
import { LIST_LIMIT } from '../../../constants';

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

  constructor(
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  public getCharacters() {
    const data: any = {
      limit: LIST_LIMIT,
      ...(this.lastItemId !== undefined && {
        lastEvaluatedKey: {
          id: this.lastItemId
        }
      })
    }

    this.http.post("https://j2hiihr9tj.execute-api.ap-southeast-1.amazonaws.com/dev/characters/list", data).subscribe({
      next: (res: any) => {
        this.characters = [...this.characters, ...res.data];
        this.lastItemId = res.pagination.lastEvaluatedKey?.id;
        this.hasNextPage = res.pagination.hasNextPage;

        console.log(res.pagination.hasNextPage);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
