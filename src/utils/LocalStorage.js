import React from "react";

class LocalStorage {

    setItem(key, value) {
        localStorage.setItem(key, value);
    }

    getItem(key) {
       return localStorage.getItem(key);
    }

    remove(key) {
        localStorage.removeItem(key);
    }
}

const instance = new LocalStorage();
export {instance as LocalStorage};