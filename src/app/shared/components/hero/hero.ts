import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
  standalone: true,
})
export class Hero {
  @Input() heroName!: string;
  @Input() heroSubtitle!: string;

  private _heroIcon!: string;
  heroIconSafe!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  @Input() 
  set heroIcon(value: string) {
    this._heroIcon = value;
    this.heroIconSafe = this.sanitizer.bypassSecurityTrustHtml(value);
  }

  get heroIcon() {
    return this._heroIcon;
  }
}
