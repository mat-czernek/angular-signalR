export class TaskDto {
  public id: number;
  public name: string;
  public timeElapsed: number;

  constructor(id: number, name: string, timeElapsed: number) {
    this.id = id;
    this.name = name;
    this.timeElapsed = timeElapsed;
  }
}
