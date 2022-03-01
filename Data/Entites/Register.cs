using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class Register
    {
        [Key]
        public int RegisterId { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
        [StringLength(50)]
        public string Email { get; set; }
        [StringLength(50)]
        public string UserName { get; set; }
        [StringLength(200)]
        public string Password { get; set; }
        [StringLength(200)]
        public string PasswordHash { get; set; }
        [StringLength(200)]
        public string PasswordSalt { get; set; }

    }
}
