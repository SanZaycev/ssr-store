export const isObject = (obj) => {
    return typeof obj === "object" && obj !== null;
}

export const isTypeUndefined = (el) => {
    return typeof el === "undefined";
}

export const isNumber = (el) => {
    return typeof el === "number";
}

export const isString = (el) => {
    return typeof el === "string";
}

export const isBoolean = (el) => {
    return typeof el === "boolean";
}

export const isArray = (el) => {
    return Array.isArray(el)
}

export const isEmptyString = (str) => {
    if (typeof str !== "string" || (str.trim() === "") || !str.trim()){ return true }
    return false
}

export const isNullString = (str) => {
    if (typeof str === "string"){
        switch (str){
            case "null": return true
            case "false": return true
            case "true": return true
            case "None": return true
            case "False": return true
            case "True": return true
            default: return false
        }
    }
    return true
}

export const getObjectById = (arr, id) => {
    if (Array.isArray(arr)){
        for (let i in arr){
            if (arr[i].id === id){
                return arr[i];
            }
        }
    }
    return null;
}
