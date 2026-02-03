import _ from "lodash";

export const toCamel = (obj: object) => _.mapKeys(obj, (v, k) => _.camelCase(k));
export const toSnake = (obj: object) => _.mapKeys(obj, (v, k) => _.snakeCase(k));

export const isRowsEqual = function<T>(row1: T,row2: T): boolean {
    for(let key in row1) {
      if(row1[key] !=  row2[key])
        return false
    }

    return true;
}