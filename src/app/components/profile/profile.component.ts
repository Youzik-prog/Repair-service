import { Component, inject, input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../core/types';
import { USERS_CONFIG } from '../../core/columnsConfigs';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private userService = inject(UsersService);

  public user = input.required<User>()

  public userConfig = USERS_CONFIG;
}
