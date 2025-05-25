import {Component, OnInit, signal} from '@angular/core';
import {TasksService} from './services/tasks.service';
import {TasksSignalrService} from './services/tasks-signalr.service';
import {TaskDto} from './models/taskDto';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {TaskStatusTranslator} from './misc/taskStatusTranslator';
import {TaskStatusDto} from './models/taskStatusDto';

@Component({
  selector: 'app-tasks',
  providers: [TasksService],
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TableModule
  ],
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  public allTasks = signal<Array<TaskDto>>([]);
  public tasksSubscription?: Subscription;
  public taskForm: FormGroup;

  constructor(private tasksService: TasksService, private tasksSignalrService: TasksSignalrService, private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group({
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
    console.log(this.taskForm.value.taskName);
    const task = new TaskDto(0, this.taskForm.value.taskName, 0);
    this.tasksService.add(task).subscribe(() => {
      console.log("Added task");
    })
  }

  onRemoveTask(id: number) {
    this.tasksService.delete(id).subscribe(() => {
      console.log("Task deleted");
    })
  }

  statusToText(status: TaskStatusDto): string {
    return TaskStatusTranslator.toText(status);
  }

  onExecuteTask(task: TaskDto) {
    this.tasksService.execute(task).subscribe(() => {
      console.log("Task executed");
    })
  }
}
