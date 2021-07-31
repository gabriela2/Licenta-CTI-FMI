using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("DeliveryTypes")]
    public class DeliveryType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price{get;set;}
        public ICollection<Ad_x_DeliveryType> Ad_X_DeliveryType{get;set;}
        
    }
}