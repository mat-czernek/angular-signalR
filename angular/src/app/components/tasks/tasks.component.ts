import {Component, OnInit, signal} from '@angular/core';
import {TasksService} from './services/tasks.service';
import {TasksSignalrService} from './services/tasks-signalr.service';
import {TaskDto} from './models/taskDto';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-tasks',
  providers: [TasksService],
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  public allTasks = signal<Array<TaskDto>>([]);
  public tasksSubscription?: Subscription;
  public tasksForm: FormGroup;

  constructor(private tasksService: TasksService, private tasksSignalrService: TasksSignalrService, private formBuilder: FormBuilder) {
    this.tasksForm = this.formBuilder.group({
      taskName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.tasksService.ping().subscribe(() => {
      console.log("Ping completed.");
    });

    this.tasksService.get().subscribe(tasks => {
      this.allTasks.set(tasks);
    });

    this.tasksSubscription = this.tasksSignalrService.tasksStatuses$.subscribe(tasks => {
      this.allTasks.set([...tasks]);
    })
  }

  onAddTask() {
    console.log(this.tasksForm.value.taskName);
    const task = new TaskDto(0, this.tasksForm.value.taskName, 0);
    this.tasksService.add(task).subscribe(() => {
      console.log("Added task");
    })
  }
}
