using TasksApi.Model;

namespace TasksApi.Core;

public class TasksStatusService : ITasksStatusService
{
    private readonly List<TaskDto> _tasks = [];
    
    public TasksStatusService()
    {
        
    }

    public void AddTask(TaskDto task)
    {
        if (task == null) throw new ArgumentNullException(nameof(task));
        
        _tasks.Add(task);
    }

    public void RemoveTask(TaskDto task)
    {
        if (task == null) throw new ArgumentNullException(nameof(task));

        var taskToRemove = _tasks.Remove(task);
    }

    public async Task ExecuteTask(TaskDto task)
    {
        if (task == null) throw new ArgumentNullException(nameof(task));
        
        var taskToExecute = _tasks.FirstOrDefault(t => t.Id == task.Id);
        
        if (taskToExecute == null)
            return;
        
        // TODO: Execute fake task
        // await...
    }

    public IReadOnlyCollection<TaskDto> GetTasks()
    {
        return _tasks;
    }
}