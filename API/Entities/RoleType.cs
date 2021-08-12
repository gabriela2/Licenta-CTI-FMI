using System.Collections.Generic;

namespace API.Entities
{
    public class RoleType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<User_x_RoleType> Users_x_RoleTypes{get;set;}
    }
}