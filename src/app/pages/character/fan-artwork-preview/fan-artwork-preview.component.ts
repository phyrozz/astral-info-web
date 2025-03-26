import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-fan-artwork-preview',
  standalone: true,
  imports: [
    MatDialogModule,
    NgOptimizedImage
  ],
  templateUrl: './fan-artwork-preview.component.html',
  styleUrl: './fan-artwork-preview.component.scss'
})
export class FanArtworkPreviewComponent {
  readonly dialogRef = inject(MatDialogRef<FanArtworkPreviewComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  onClose(): void {
    this.dialogRef.close();
  }
}
