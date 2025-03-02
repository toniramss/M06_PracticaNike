import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private apiUrl = 'http://localhost:3000/upload'; // La URL de tu servidor Express

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file, file.name);

    return this.http.post(this.apiUrl, formData, {
      headers: new HttpHeaders(),
    });
  }
}
