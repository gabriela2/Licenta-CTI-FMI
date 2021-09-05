using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs
{
    public class AdDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [StringLength(maximumLength: 1000, MinimumLength = 30)]
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public double Quantity { get; set; }
        public bool ExistsLimit { get; set; }
        public double? Limit { get; set; }
        public bool IsActive { get; set; }
        public string Url { get; set; }
        public int UserId { get; set; }
        public string UnitOfMeasure { get; set; }
        public int UnitOfMeasureId { get; set; }
        public string Category { get; set; }
        public int CategoryId{get;set;}
        public bool IsValidated { get; set; }
        public bool IsRejected { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        public ICollection<Ad_x_DeliveryTypeDto> Ad_x_DeliveryType{get;set;}
        public ICollection<DemandDto> Demands {get;set;}
    


    }
}