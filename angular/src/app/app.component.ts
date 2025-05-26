import {Component, OnDestroy, OnInit} from '@angular/core';
import {TasksComponent} from './components/tasks/tasks.component';
import {TasksSignalrService} from './services/signalR/tasks-signalr.service';

@Component({
  selector: 'app-root',
  imports: [TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private tasksSignalrService: TasksSignalrService) {
  }

  ngOnInit(): void {
    this.tasksSignalrService.start();
  }


  ngOnDestroy(): void {
    this.tasksSignalrService.stop();
  }
}
