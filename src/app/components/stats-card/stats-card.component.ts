import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  imports: [],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.css',
})
export class StatsCardComponent {

  statName = input.required<string>();

  value = input<string>('-');

  color = input<'red' | 'green' | 'blue' | 'orange'>('blue');

}
