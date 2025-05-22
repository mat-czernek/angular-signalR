import {Component} from '@angular/core';
import {TasksComponent} from './components/tasks/tasks.component';

@Component({
  selector: 'app-root',
  imports: [TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
