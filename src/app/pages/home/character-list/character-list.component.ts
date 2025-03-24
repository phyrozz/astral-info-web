import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CustomSidenavComponent } from "../../../components/custom-sidenav/custom-sidenav.component";

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    RouterLink,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    CustomSidenavComponent
],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent {
  @Input() charactersData: any[] = [];

  getImageSource(id: number): string {
    const pngPath = `splash-arts/${id}.png`;
    const img = new Image();
    img.src = pngPath;
    
    if (!img.onerror) {
      return pngPath;
    } else {
      return `splash-arts/${id}.gif`;
    }
  }
}
