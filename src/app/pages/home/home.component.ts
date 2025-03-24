import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { CharacterListComponent } from "./character-list/character-list.component";
import { CustomToolbarComponent } from "../../components/custom-toolbar/custom-toolbar.component";
import { CustomSidenavComponent } from "../../components/custom-sidenav/custom-sidenav.component";

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

  constructor(
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  public getCharacters() {
    this.http.post("https://j2hiihr9tj.execute-api.ap-southeast-1.amazonaws.com/dev/characters/list").subscribe({
      next: (res: any) => {
        this.characters = res.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
