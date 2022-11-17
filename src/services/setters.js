import {isObject} from "./getters.js";
import {toast} from "bulma-toast";

export const setToastMessage = (
    message,
    type='w-error',
    time=5000,
    position="top-right"
    ) => {
    toast({
        message: message,
        type: type,
        dismissible: true,
        pauseOnHover: true,
        duration: time,
        position: position,
    })
}

export const scrollTo = async (el, behavior="smooth") => {
    if (el){
        el.scrollIntoView({block: "start", behavior: behavior})
    }
}

export const deleteObject = (obj) => {
    if (isObject(obj)) {
        Object.keys(obj).forEach(function (prop) {
            delete obj[prop];
        });
    }
}

export const parseObjects = (obj, new_obj) => {
    if (isObject(new_obj)){
        for (const [k, v] of Object.entries(new_obj)){
            // console.log("PARSE KEY =>", k);
            if (typeof v === "string"){
                obj[k] = v;
            }
            else if (typeof v === "number" && v > 0){
                obj[k] = v;
            }
            else if (typeof v === "boolean"){
                obj[k] = v;
            }
            else if (Array.isArray(v)) {
                if (typeof obj[k] === "undefined"){ obj[k] = v }
                else { mergeArrays(obj[k], v) }
                // console.log('Parse ARRAY! ============>', v, obj[k])
            }
            else if (isObject(v)){
                for (const [k2, v2] of Object.entries(v)){
                    if (typeof obj[k] === "object"){
                        if (v2 === null){
                            obj[k][k2] = null
                        }
                        else if (typeof v2 === "string"){
                            obj[k][k2] = v2;
                        }
                        else if (typeof v2 === "number" && v2 > 0){
                            obj[k][k2] = v2;
                        }
                        else if (typeof v2 === "boolean"){
                            obj[k][k2] = v2;
                        }
                        else if (Array.isArray(v2)) {
                            if (typeof obj[k][k2] === "undefined"){ obj[k][k2] = v2 }
                            else { mergeArrays(obj[k][k2], v2) }
                            // console.log('Parse ARRAY! ============>', v2, obj[k][k2])
                        }
                        else if (isObject(v2)){
                            for (const [k3, v3] of Object.entries(v2)){
                                if (typeof obj[k][k2] === "object"){
                                    if (v3 === null){
                                        obj[k][k2][k3] = null
                                    }
                                    else if (typeof v3 === "string"){
                                        obj[k][k2][k3] = v3;
                                    }
                                    else if (typeof v3 === "number" && v3 > 0){
                                        obj[k][k2][k3] = v3;
                                    }
                                    else if (typeof v3 === "boolean"){
                                        obj[k][k2][k3] = v3;
                                    }
                                    else if (Array.isArray(v3)) {
                                        if (typeof obj[k][k2][k3] === "undefined"){ obj[k][k2][k3] = v3 }
                                        else { mergeArrays(obj[k][k2][k3], v3) }
                                        // console.log('ARRAY parsed! ============>', v3, obj[k][k2])
                                    }
                                    else if (typeof v3 === "object"){
                                        obj[k][k2][k3] = { ...v3 };
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export const mergeArrays = (arr, new_arr) => {
    if (Array.isArray(arr) && Array.isArray(new_arr)) {
        for (let i = 0; i < new_arr.length; i++) {
            arr.push(new_arr[i]);
        }
    }
}

export const parseArrays = (arr, new_arr) => {
    if (Array.isArray(arr) && Array.isArray(new_arr)){
        for (let i = 0; i < new_arr.length; i++){
            const new_obj = new_arr[i];
            const obj = arr.find(o => o.id === new_obj.id);
            if (obj){
                parseObjects(obj, new_obj)
            } else {
                arr.push(new_obj);
            }
        }
    }
}
