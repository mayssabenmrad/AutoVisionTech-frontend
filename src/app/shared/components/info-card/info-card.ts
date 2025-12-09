import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-card.html',
  styleUrls: ['./info-card.css']
})
export class InfoCard {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() description!: string;
}