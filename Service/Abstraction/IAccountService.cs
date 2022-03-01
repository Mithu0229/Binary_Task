using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public interface IAccountService
    {
      Task<bool> Register(Register register);
      Task<bool> Login(Register register);
    }
}
