using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class TaskDBContext : DbContext
    {
        public TaskDBContext(DbContextOptions<TaskDBContext> options)
             : base(options)
        {
        }
        public DbSet<Register> Registers { get; set; }
        public DbSet<Task> Tasks { get; set; }

    }
}
