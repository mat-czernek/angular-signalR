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

        //TODO: Just a dummy way to verify whether we can call the hub
        //Move this on action from HTML tempalte
        this.executeTask(new TaskDto(0, "d", 0));
      })
      .catch(error => console.log('Hub connection error: ' + error));

    this.hubConnection.on('TasksStatuses', (tasks: TaskDto[]) => {
      this.tasksStatusesSubject.next(tasks);
    })

  }

  public async executeTask(task: TaskDto) {
    await this.hubConnection.invoke('ExecuteTask', task);
  }
}
