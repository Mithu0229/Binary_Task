using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public interface ITaskService
    {
       Task<bool> AddTask(Data.Task task);
        Task<List<Data.Task>> GetTasks();
        Task<List<Data.Task>> SearchTask(string name);
    }
}
