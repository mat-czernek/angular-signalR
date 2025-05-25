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

        if (_tasks.Any())
        {
            var maxIdFromExisting = _tasks.Max(x => x.Id);
            task.Id = maxIdFromExisting + 1;
        }
        else
        {
            task.Id = 1;
        }
        
        _tasks.Add(task);
    }

    public void RemoveTask(int id)
    {
        var task = _tasks.FirstOrDefault(x => x.Id == id);
        
        if (task == null) return;
        
        _tasks.Remove(task);
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