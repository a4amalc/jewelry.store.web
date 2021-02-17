import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  constructor() { }

  setData(key, data) {
    localStorage.setItem(key, data);
  }

  getData(key) {
    return localStorage.getItem(key);
  }
}
