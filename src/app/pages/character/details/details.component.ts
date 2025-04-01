import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { environment } from '../../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    MatSliderModule,
    FormsModule
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
  stats: any[] = [];
  level: number = 1;

  ngOnInit(): void {
    this.setDetails(this.characterDetails);
    this.setStats(this.characterDetails);
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

  private setStats(data: any) {
    this.stats = [
      {
        description: "HP",
        icon: "favorite",
        data: data.base_stats.hp,
        isMatIcon: true
      },
      {
        description: "ATK",
        icon: "favorite",
        data: data.base_stats.atk,
        isMatIcon: true
      },
      {
        description: "DEF",
        icon: "shield",
        data: data.base_stats.def,
        isMatIcon: true
      },
      {
        description: "SPD",
        icon: "favorite",
        data: data.base_stats.spd,
        isMatIcon: true
      },
      {
        description: "Taunt",
        icon: "favorite",
        data: data.base_stats.taunt,
        isMatIcon: true
      }
    ];
  }
}
