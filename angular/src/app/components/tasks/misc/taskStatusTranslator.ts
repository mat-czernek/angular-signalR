import {TaskStatusDto} from '../models/taskStatusDto';

export class TaskStatusTranslator {
  public static toText(status: TaskStatusDto): string {
    switch (status) {
      case TaskStatusDto.Unknown:
        return 'Unknown';
      case TaskStatusDto.InProgress:
        return 'InProgress';
      case TaskStatusDto.Completed:
        return 'Completed';
    }
  }
}
