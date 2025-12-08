import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Car } from 'src/app/core/models';

@Component({
  selector: 'app-car-crad',
  imports: [RouterLink],
  templateUrl: './car-crad.html',
  styleUrl: './car-crad.css',
  standalone: true,
})
export class CarCrad {
  @Input() car!: Car;
}
