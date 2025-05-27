import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr'
import {Observable, Subject} from 'rxjs';
import {TaskDto} from '../../components/tasks/models/taskDto';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksSignalrService {

  public connectionId: string = '';
  private readonly hubConnection: HubConnection;
  private tasksStatusesSubject = new Subject<TaskDto[]>();
  public tasksStatuses$: Observable<TaskDto[]> = this.tasksStatusesSubject.asObservable();

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.signalRBaseUrl + "tasksHub")
      .build();
  }

  public start() {

    if (this.hubConnection == null) {
      return;
    }

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connected to tasks hub.');
        this.connectionId = this.hubConnection.connectionId ?? '';
      })
      .catch(error => console.log('Tasks hub connection error: ' + error));

    this.hubConnection.on('TasksStatuses', (tasks: TaskDto[]) => {
      this.tasksStatusesSubject.next(tasks);
    })
  }

  public stop() {
    if (this.hubConnection == null) {
      return;
    }

    this.hubConnection.stop().then(() => {
      console.log('Disconnected from tasks hub.');
    });
  }

  public getRunningTasksCount(): Observable<number> {
    return new Observable<number>((subscriber) => {
      this.hubConnection
        .invoke<number>('RunningTasksCount')
        .then((count) => {
          subscriber.next(count);
          subscriber.complete();
        })
        .catch((err) => {
          subscriber.error(err);
        });
    });
  }

}
