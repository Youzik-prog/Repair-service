import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from } from 'rxjs';

const supabaseUrl = 'https://gwnuhprexigmpaxkkczc.supabase.co';
const supabaseKey = 'sb_publishable_w-ZYBP5aa6Eu4ffKFgHjZw_ybwUCRE0';
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
