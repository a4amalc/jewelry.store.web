import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  exportAsPdf(request) {
    return this.http.post(environment.apiUrl + 'File/ExportPdf', request, { responseType: 'blob' });
  }
  print() {
    return this.http.get(environment.apiUrl + 'File/Print');
  }
}
