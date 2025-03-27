import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-custom-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './custom-toolbar.component.html',
  styleUrl: './custom-toolbar.component.scss',
  animations: [
    trigger('slideInOut', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      state('*', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition(':enter', [
        animate('150ms ease-out')
      ]),
      transition(':leave', [
        animate('150ms ease-in')
      ])
    ])
  ]
})
export class CustomToolbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() searchEvent = new EventEmitter<string>();

  search = new FormControl('');
  showSearchField: boolean = false;

  toggleSideNav() {
    this.toggleSidenav.emit();
  }

  onSearch() {
    if (this.search.value) {
      this.searchEvent.emit(this.search.value ?? '');
    }
  }

  toggleSearchField() {
    this.showSearchField = true;
  }
}
