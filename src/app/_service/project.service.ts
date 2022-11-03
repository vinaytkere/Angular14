import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }

  addProject(data: any): Observable<any> {
    return this.httpClient.post<any>('https://localhost:44375/projects', data);
  }
  getAllProjects(): Observable<any> {
    return this.httpClient.get<any>('https://localhost:44375/GetProject');
  }
  deleteProjectById(id: number): Observable<any> {
    return this.httpClient.delete<any>('https://localhost:44375/Delete' + '?id=' + id + '');
  }
}
