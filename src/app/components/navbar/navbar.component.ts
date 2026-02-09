import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @ViewChild('nav') navRef!: ElementRef<HTMLElement>;

  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;

  onMouseDown(e: MouseEvent) {
    this.isDown = true;
    const nav = this.navRef.nativeElement;
    nav.style.cursor = 'grabbing';
    this.startX = e.pageX - nav.offsetLeft;
    this.scrollLeft = nav.scrollLeft;
  }

  onMouseUp() {
    this.isDown = false;
    if (this.navRef) this.navRef.nativeElement.style.cursor = 'grab';
  }

  onMouseMove(e: MouseEvent) {
    if (!this.isDown) return;
    e.preventDefault();
    const nav = this.navRef.nativeElement;
    const x = e.pageX - nav.offsetLeft;
    const walk = (x - this.startX); 
    nav.scrollLeft = this.scrollLeft - walk;
  }
}
