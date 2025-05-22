import {Component, OnInit} from '@angular/core';
import {TasksService} from './services/tasks.service';

@Component({
  selector: 'app-tasks',
  providers: [TasksService],
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  constructor(private tasksService: TasksService) {
  }

  ngOnInit(): void {
    this.tasksService.ping().subscribe(() => {
      console.log("Ping completed.");
    });
  }

}
