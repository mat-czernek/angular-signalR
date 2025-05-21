using Microsoft.AspNetCore.Mvc;

namespace TasksApi.Controllers;

[ApiController]
[Route("[controller]")]
public class TasksController : ControllerBase
{
    [HttpGet(Name = "GetTasks")]
    public IActionResult Get()
    {
        return Ok();
    }
}