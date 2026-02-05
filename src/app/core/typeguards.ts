import { PostgrestError } from "@supabase/supabase-js";
import { Order, User } from "./types";

export function isSupabaseError(error: any): error is PostgrestError {
  return error && typeof error === 'object' && 'code' in error && 'details' in error;
}

function basicTypeGuardCheck(obj: any): boolean {
  return obj !== null &&
    typeof obj === 'object' &&
    'id' in obj;
}

export const isOrder = function(obj: any): obj is Order {
    return (
    basicTypeGuardCheck(obj) &&
    'deviceId' in obj &&
    'workerId' in obj &&
    'userId' in obj &&
    'price' in obj &&
    'startDate' in obj &&
    'endDate' in obj
  );
}

export const isUser = function(obj: any): obj is User {
  return (
    basicTypeGuardCheck(obj) &&
    'name' in obj &&
    'password' in obj &&
    'lastName' in obj &&
    'email' in obj &&
    'phone' in obj &&
    'type' in obj
  )
}
