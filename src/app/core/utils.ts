import _ from "lodash";
import { RecordValidationError } from "./errors";
import { Order, TableService, User } from "./types";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of, switchMap, timer } from "rxjs";

export const toCamel = (obj: object) => _.mapKeys(obj, (v, k) => _.camelCase(k));
export const toSnake = (obj: object) => _.mapKeys(obj, (v, k) => _.snakeCase(k));

export const isRowsEqual = function<T>(row1: T,row2: T): boolean {
    for(let key in row1) {
      if(row1[key] !=  row2[key])
        return false
    }

    return true;
}

export function foreignKeyValidator(service: TableService<any>): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null);

    return timer(500).pipe(
      switchMap(() => service.getRecordById(+control.value)),
      map(record => {
        return record ? null : { foreignKeyNotFound: true };
      }),
      catchError(() => of({ foreignKeyError: true }))
    )
  }
}

export const validateOrder = function(order: Order): object {
  if(order.startDate && order.endDate) {
    if(new Date(order.startDate) > new Date(order.endDate)) {
      throw new RecordValidationError("Дата начала ремонта не может быть позднее даты окончания!");
    }
  }

  return {
    device_id: order.deviceId,
    worker_id: order.workerId || null,
    user_id: order.userId || null,
    price: order.price || null,
    start_date: order.startDate || null,
    end_date: order.endDate || null
  }
}

export const validateUser = function(user: User): object {
  if(!user.name) {
    throw new RecordValidationError("Не заполнено имя пользователя!");
  } 
  else if(!user.password) {
    throw new RecordValidationError("Не заполнен пароль!");
  } 
  else if(!user.email || !user.phone) {
    throw new RecordValidationError("Не заполнен номер телефона или электронная почта!");
  }
  else if(!user.type) {
    throw new RecordValidationError("Не заполнен тип пользователя!");
  }

  return {
    name: user.name,
    password: user.password,
    last_name: user.lastName || null,
    email: user.email || null,
    phone: user.phone || null,
    type: user.type
  }
}