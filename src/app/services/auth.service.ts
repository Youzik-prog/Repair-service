import { Injectable, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly currentUser = signal<User | null>;

  constructor(private supabase: SupabaseService) {}

  async login(login: string, pass: string): Promise<void> {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: login,
      password: pass
    });

    if (error) throw error;
  }
}
