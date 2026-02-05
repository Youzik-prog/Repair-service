import { Order, User } from "./types";

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
