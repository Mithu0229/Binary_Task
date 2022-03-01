using Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class TaskService : ITaskService
    {
        private readonly TaskDBContext _dbContext;
        public TaskService(TaskDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> AddTask(Data.Task task)
        {
            try
            {
                await _dbContext.Tasks.AddAsync(task);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<List<Data.Task>> GetTasks()
        {
            try
            {
                var tasks =await _dbContext.Tasks.ToListAsync();
                return tasks;
            }
            catch (Exception ex)
            {

                return new List<Data.Task>();
            }
        }

        public async Task<List<Data.Task>> SearchTask(string name)
        {
            try
            {
                var tasks = await _dbContext.Tasks.Where(x=>x.Name.Contains(name)).ToListAsync();
                return tasks;
            }
            catch (Exception ex)
            {

                return new List<Data.Task>();
            }
        }
    }
}
