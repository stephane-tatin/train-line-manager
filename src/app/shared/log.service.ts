import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  info(message: string) {
    console.log("info", message)
  }
}
