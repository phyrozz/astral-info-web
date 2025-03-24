import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-custom-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './custom-toolbar.component.html',
  styleUrl: './custom-toolbar.component.scss'
})
export class CustomToolbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  toggleSideNav() {
    this.toggleSidenav.emit();
  }
}
