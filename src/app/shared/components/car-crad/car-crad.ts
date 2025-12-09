import { Component, Input } from '@angular/core';
import { Car } from 'src/app/core/models';

@Component({
  selector: 'app-car-crad',
  imports: [],
  templateUrl: './car-crad.html',
  styleUrl: './car-crad.css',
  standalone: true,
})
export class CarCrad {
  @Input() car!: Car;

  goToCarPage(): void {
    window.location.href = `/car-page/${this.car.id}`;
  }
}
