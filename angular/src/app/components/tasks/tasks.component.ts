import {Component, OnInit, signal} from '@angular/core';
import {TasksService} from './services/tasks.service';
import {TasksSignalrService} from './services/tasks-signalr.service';
import {TaskDto} from './models/taskDto';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tasks',
  providers: [TasksService],
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  public allTasks = signal<Array<TaskDto>>([]);

  public tasksSubscription?: Subscription;

  constructor(private tasksService: TasksService, private tasksSignalrService: TasksSignalrService) {
  }

  ngOnInit(): void {
    this.tasksService.ping().subscribe(() => {
      console.log("Ping completed.");
    });

    this.tasksSubscription = this.tasksSignalrService.tasksStatuses$.subscribe(tasks => {
      this.allTasks.set([...tasks]);
    })
  }

}
