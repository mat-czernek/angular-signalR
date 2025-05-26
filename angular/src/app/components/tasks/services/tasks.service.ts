import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {TaskDto} from '../models/taskDto';
import {TasksSignalrService} from '../../../services/signalR/tasks-signalr.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {

  private readonly endpoint = "tasks";

  constructor(private http: HttpClient, private taskSignalrService: TasksSignalrService) {
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

  public executeWithResponseForAll(task: TaskDto): Observable<any> {
    return this.http.post(environment.apiBaseUrl + this.endpoint + "/executeWithResponseForAll/", task);
  }

  public executeWithResponseForCaller(task: TaskDto): Observable<any> {
    return this.http.post(environment.apiBaseUrl + this.endpoint + "/executeWithResponseForCaller/" + this.taskSignalrService.connectionId, task);
  }
}
