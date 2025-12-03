import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {}

  private base_url = "http://localhost:8080/api";

  getTodos(): Observable<any> {
    return this.http.get(`${this.base_url}/getTodos`);
  }

  addTodo(data: any): Observable<any> {
    return this.http.post(`${this.base_url}/createTodo`, data);
  }

  updateTodo(id: number, data: any): Observable<any> {
    return this.http.put(`${this.base_url}/updateTodo/${id}`, data);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.base_url}/deleteTodo/${id}`);
  }
}
