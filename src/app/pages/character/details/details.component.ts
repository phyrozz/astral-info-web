import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { environment } from '../../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule
  ],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-out', style({ opacity: 1 }))
      ])
    ])
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  @Input() characterDetails: any;
  details: any[] = [];

  ngOnInit(): void {
    this.setDetails(this.characterDetails);
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
        icon: `${environment.assetBucketUrl}/path-icons/Path Icon_1_${data.path}.png`,
        data: data.path
      },
      {
        description: "Type",
        icon: `${environment.assetBucketUrl}/type-icons/Type_${data.type}.webp`,
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
