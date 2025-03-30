import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [
    MatSelectModule,
    FormsModule,
    MatFormFieldModule
  ],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss'
})
export class CustomSelectComponent {
  @Input() options: any[] = [];
  @Input() label: string = '';
  @Input() controlName: string = '';
  @Input() defaultValue: any = null;
  @Output() onOpenChange: EventEmitter<boolean> = new EventEmitter();
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();
  public selectedValue: any;

  onOpen(opened: boolean) {
    this.onOpenChange.emit(opened);
  } 

  onSelect(value: any) {
    this.selectedValue = value;
    this.onSelectionChange.emit(value);
  }
}
