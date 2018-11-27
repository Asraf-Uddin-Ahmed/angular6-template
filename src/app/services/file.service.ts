import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  getFileExtension(filename) {
    return filename.split('.').pop();
  }

}
