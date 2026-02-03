import { Order } from "./types";

export const isOrder = function(obj: any): obj is Order {
    return (
    obj !== null &&
    typeof obj === 'object' &&
    'deviceId' in obj &&
    'id' in obj &&
    'workerId' in obj &&
    'userId' in obj &&
    'price' in obj &&
    'startDate' in obj &&
    'endDate' in obj
  );
}