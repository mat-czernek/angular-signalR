import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {TaskDto} from '../models/taskDto';

@Injectable({
  providedIn: 'root',
})
export class TasksService {

  private readonly endpoint = "tasks";

  constructor(private http: HttpClient) {
  }

  public ping(): Observable<any> {
    return this.http.get<any>(environment.apiBaseUrl + this.endpoint + "/ping");
  }

  public get(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(environment.apiBaseUrl + this.endpoint);
  }

  public add(task: TaskDto): Observable<any> {
    return this.http.post(environment.apiBaseUrl + this.endpoint, task);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(environment.apiBaseUrl + this.endpoint + "/" + id);
  }

  public update(task: TaskDto): Observable<any> {
    return this.http.put(environment.apiBaseUrl + this.endpoint, task);
  }

  public execute(task: TaskDto): Observable<any> {
    return this.http.post(environment.apiBaseUrl + this.endpoint + "/execute/", task);
  }
}
