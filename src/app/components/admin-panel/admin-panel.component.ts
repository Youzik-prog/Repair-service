import { Component, computed, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ProfileComponent } from "../profile/profile.component";
import { User } from '../../core/types';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { SpravkaComponent } from "../spravka/spravka.component";
import { RouterLink, RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  imports: [HeaderComponent, ProfileComponent, RouterLink, RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent implements OnInit {

  private userService = inject(UsersService);

  private authService = inject(AuthService);

  authUser = computed(() => this.authService.currentUser());

  currentUser = signal<User | null>(null);

  @ViewChild('profileDialog') dialog!: ElementRef<HTMLDialogElement>;

  isProfileVisible = signal(false);

  ngOnInit(): void {

    const authUser = this.authUser();
    
    this.userService.getRecordsByColumn('userUuid', authUser?.id).subscribe((user) => {
      if (user.length > 0) {
        this.currentUser.set(user[0]);
      }
    })

  }

  showProfile() {
    this.isProfileVisible.set(true);

    setTimeout(() => {
      this.dialog.nativeElement.showModal();
    });
  }

  closeProfile() {
    this.isProfileVisible.set(false);
    this.dialog.nativeElement.close();
  }

}

