using TasksApi.Core;

namespace TasksApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        
        builder.Services.AddControllers();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AngularCorsPolicy", policyBuilder =>
            {
                policyBuilder.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:4200", "http://localhost:5172");
            });
        });

        builder.Services.AddSignalR();
        
        builder.Services.AddSingleton<ITasksStatusService>(new TasksStatusService());
        
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();
        
        app.MapControllers();

        app.UseCors("AngularCorsPolicy");
        
        app.MapHub<TasksHub>("/tasksHub");

        app.Run();
    }
}