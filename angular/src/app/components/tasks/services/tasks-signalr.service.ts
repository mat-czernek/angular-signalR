import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr'
import {Observable, Subject} from 'rxjs';
import {TaskDto} from '../models/taskDto';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksSignalrService {

  private hubConnection: HubConnection;
  private tasksStatusesSubject = new Subject<TaskDto[]>();
  public tasksStatuses$: Observable<TaskDto[]> = this.tasksStatusesSubject.asObservable();

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.signalRBaseUrl + "tasksHub")
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connected to hub');
      })
      .catch(error => console.log('Hub connection error: ' + error));

    this.hubConnection.on('TasksStatuses', (tasks: TaskDto[]) => {
      this.tasksStatusesSubject.next(tasks);
    })
  }
}
