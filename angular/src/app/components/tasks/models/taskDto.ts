export class TaskDto {
  public Id: number;
  public Name: string;
  public TimeElapsed: number;

  constructor(id: number, name: string, timeElapsed: number) {
    this.Id = id;
    this.Name = name;
    this.TimeElapsed = timeElapsed;
  }
}
