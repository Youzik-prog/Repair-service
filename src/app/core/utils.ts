import _ from "lodash";
import { RecordValidationError, TableExportError } from "./errors";
import { Order, User } from "./types";
import { isSupabaseError } from "./typeguards";
import { AuthError } from "@supabase/supabase-js";

export const toCamel = (obj: object) => _.mapKeys(obj, (v, k) => _.camelCase(k));
export const toSnake = (obj: object) => _.mapKeys(obj, (v, k) => _.snakeCase(k));

export const isRowsEqual = function<T>(row1: T,row2: T): boolean {
    for(let key in row1) {
      if(row1[key] !=  row2[key])
        return false
    }

    return true;
}

// export function foreignKeyValidator(service: TableService<any>): AsyncValidatorFn {
//   return (control: AbstractControl): Observable<ValidationErrors | null> => {
//     if (!control.value) return of(null);

//     return timer(500).pipe(
//       switchMap(() => service.getRecordById(+control.value)),
//       map(record => {
//         return record ? null : { foreignKeyNotFound: true };
//       }),
//       catchError(() => of({ foreignKeyError: true }))
//     )
//   }
// }

export function showErrorMessage(error: unknown): void {
    if(error instanceof RecordValidationError) {
      alert("Неправильное заполнение полей!\n" + error.message);
    } 
    else if(error instanceof TableExportError) {
      alert("Ошибка экспорта таблицы!\n" + error.message)
    }
    else if(error instanceof AuthError) {
      alert(`Ошибка авториазации! ${error.message}`);
    }
    else if(isSupabaseError(error)) {
      if(error.code === '23503') {
        alert('Введён несуществующий идентификатор!');
      } else if(error.code === '23505') {
        console.log(error);
        const details = error.details;
        const rowName = details.slice(details.indexOf('(') + 1, details.indexOf(')'))
        switch(rowName) {
          case 'phone': alert('Запись с таким номером телефона уже существует!'); break;
          case 'email': alert('Запись с такой электронной почтой уже существует!'); break;
          case 'name': alert('Запись с таким именем уже существует!'); break;
          default: alert(`Запись с таким ${rowName} уже существует!`);
        }
      }
    } 
    else {
      console.error(error);
    }
  }

