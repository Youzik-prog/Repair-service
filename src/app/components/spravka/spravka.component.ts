import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-spravka',
  imports: [HeaderComponent, RouterLink],
  templateUrl: './spravka.component.html',
  styleUrl: './spravka.component.css',
})
export class SpravkaComponent {

}
