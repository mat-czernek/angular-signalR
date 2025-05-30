using System.Collections.Concurrent;
using TasksApi.Model;

namespace TasksApi.Core;

public class TasksInMemoryStorage : ITaskStorage
{
    private readonly ConcurrentDictionary<int, TaskDto> _tasks = new ConcurrentDictionary<int, TaskDto>();
    
    public TaskDto Add(TaskDto task)
    {
        if (_tasks.IsEmpty)
            task.Id = 1;
        else
            task.Id = _tasks.Max(t => t.Key) + 1;
        
        _tasks.TryAdd(task.Id, task);

        return task;
    }

    public void Delete(int id)
    {
        if (_tasks.ContainsKey(id) == false)
            return;
        
        _tasks.TryRemove(id, out _);
    }

    public TaskDto Update(TaskDto task)
    {
        if (_tasks.TryGetValue(task.Id, out var taskToUpdate) == false)
            return task;
        
        _tasks[taskToUpdate.Id] = task;

        return task;
    }

    public IReadOnlyCollection<TaskDto> GetAll()
    {
        return _tasks.Values.ToArray();
    }

    public bool TryGetById(int id, out TaskDto? task)
    {
        return _tasks.TryGetValue(id, out task);
    }
}