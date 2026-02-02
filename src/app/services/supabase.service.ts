import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from } from 'rxjs';
import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from '../core/constants';

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_PUBLIC_KEY;
const supabaseSecretKey: string | null = null;

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public client: SupabaseClient;

  constructor() {
    this.client = createClient(supabaseUrl, supabaseSecretKey ?? supabaseKey);
  }
  
  async getUsers() {
    console.log("HELLOOOOO");
    
    const { data, error } = await this.client
      .from('Users')
      .select('*');

    if (error) {
      console.error("Ошибка базы:", error.message);
      return;
    }

    console.log("Данные получены:", data);
    return data;
  }
  
}
