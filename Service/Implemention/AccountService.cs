using Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class AccountService : IAccountService
    {
        private readonly TaskDBContext _dbContext;
        public AccountService(TaskDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> Login(Register register)
        {
            try
            {
                var result =await _dbContext.Registers.SingleOrDefaultAsync(x => x.UserName == register.UserName);

                if (result == null)
                {
                    return false;
                }
                var passwordHash = HashingHelper.HashUsingPbkdf2(register.Password, result.PasswordSalt);

                if (result.PasswordHash != passwordHash)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> Register(Register register)
        {
            try
            {
                var salt = HashingHelper.GenerateSalt();
                var passwordHash = HashingHelper.HashUsingPbkdf2(register.Password, salt);
                register.PasswordSalt = salt;
                register.PasswordHash = passwordHash;
                await _dbContext.Registers.AddAsync(register);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
