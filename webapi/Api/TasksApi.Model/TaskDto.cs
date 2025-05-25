namespace TasksApi.Model;

public class TaskDto
{
    public int Id { get; set; }
    
    public string? Name { get; set; }
    
    public int TimeElapsed { get; set; }
    
    public TaskStatusDto Status { get; set; }
}