import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  exportAsPdf(request){
    return this.http.post('http://localhost:5000/File/ExportPdf',request, { responseType: 'blob' });
  }
  print(){
    return this.http.get('http://localhost:5000/File/Print');
  }
}
