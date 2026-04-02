import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private apiUrl = 'http://localhost:3000/stories';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  create(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  remove(id: string | number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  update(id: string, data: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }
}
