import {Component, OnInit, signal} from '@angular/core';
import {TasksService} from './services/tasks.service';
import {TaskDto} from './models/taskDto';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TableEditCompleteEvent, TableModule} from 'primeng/table';
import {TaskStatusTranslator} from './misc/taskStatusTranslator';
import {TaskStatusDto} from './models/taskStatusDto';
import {TasksSignalrService} from '../../services/signalR/tasks-signalr.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tasks',
  providers: [TasksService],
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    FormsModule,
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
    this.tasksSubscription = this.tasksSignalrService.tasksStatuses$.subscribe(tasks => {
      this.allTasks.set([...tasks]);
    })

    this.tasksService.get().subscribe(tasks => {
      this.allTasks.set(tasks);
    });
  }

  onAddTask() {
    const task = new TaskDto(0, this.taskForm.value.taskName, 0);
    this.tasksService.add(task).subscribe();
  }

  onRemoveTask(id: number) {
    this.tasksService.delete(id).subscribe();
  }

  statusToText(status: TaskStatusDto): string {
    return TaskStatusTranslator.toText(status);
  }

  onExecuteWithResponseForAll(task: TaskDto) {
    this.tasksService.executeWithResponseForAll(task).subscribe();
  }

  onExecuteWithResponseForCaller(task: TaskDto) {
    this.tasksService.executeWithResponseForCaller(task).subscribe();
  }

  onTaskEditComplete(event: TableEditCompleteEvent) {
    const task = this.allTasks().find((t) => t.id === event.index);

    if (task === undefined) {
      return;
    }

    this.tasksService.update(task).subscribe();
  }

  private _runningTasksCount: number = 0;

  public get runningTasksCount(): string {
    return String(this._runningTasksCount);
  }

  onGetRunningTasksCount() {
    this.tasksSignalrService.getRunningTasksCount().subscribe((count) => {
      this._runningTasksCount = count;
    });
  }
}
