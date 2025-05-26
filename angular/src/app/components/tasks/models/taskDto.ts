import {TaskStatusDto} from './taskStatusDto';

export class TaskDto {
  public id: number;
  public name: string;
  public timeElapsed: number;
  public status: TaskStatusDto;

  constructor(id: number, name: string, timeElapsed: number) {
    this.id = id;
    this.name = name;
    this.timeElapsed = timeElapsed;
    this.status = TaskStatusDto.Unknown;
  }
}
