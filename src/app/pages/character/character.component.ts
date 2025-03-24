import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http/http.service';
import { CustomSidenavComponent } from "../../components/custom-sidenav/custom-sidenav.component";
import { CustomToolbarComponent } from "../../components/custom-toolbar/custom-toolbar.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [
    RouterLink,
    CustomSidenavComponent,
    CustomToolbarComponent,
    MatButtonModule,
    MatIconModule,
    MatListModule
],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {
  @ViewChild(CustomSidenavComponent) drawer!: CustomSidenavComponent;

  characterData: any;
  id: number = 0;
  details: any[] = [];

  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
        this.setDetails(this.characterData);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  private setDetails(data: any) {
    this.details = [
      {
        description: "Name",
        icon: "person",
        data: data.name,
        isMatIcon: true
      },
      {
        description: "Path",
        icon: "path-icons/Path Icon_1_" + data.path + ".png",
        data: data.path
      },
      {
        description: "Type",
        icon: "type-icons/Type_" + data.type + ".webp",
        data: data.type
      },
      {
        description: "Rarity",
        icon: "star",
        data: data.rarity,
        isMatIcon: true
      }
    ];
  }
}
