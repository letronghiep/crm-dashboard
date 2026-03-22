import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface UploadedFile {
  name: string;
  serverPath: string;
  type: string;
  size: number
}

@Injectable({ providedIn: 'root' })
export class UploadService {
  private baseUrl = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<UploadedFile> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadedFile>(`${this.baseUrl}/upload`, formData);
  }

  delete(serverPath: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/upload`, {
      body: { serverPath },
    });
  }
}
