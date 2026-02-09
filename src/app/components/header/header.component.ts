import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../core/types';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {

  authService = inject(AuthService);

  userService = inject(UsersService);

  userName = input<string | null>(null);

  showUserProfile = output<void>();

  ngOnInit(): void {
    
  }

  showProfile() {;    
    this.showUserProfile.emit();
  }

}
