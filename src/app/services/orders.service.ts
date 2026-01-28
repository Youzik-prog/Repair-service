import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  

  constructor(supabase: SupabaseService) { }


}
