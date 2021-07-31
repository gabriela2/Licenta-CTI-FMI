using System;
using System.Collections.Generic;
using HelpAFamilyOfferAChance.API.Entities;

namespace API.Entities
{
    public class Ad
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public double Quantity { get; set; }
        public bool ExistsLimit { get; set; }
        public double ? Limit { get; set; }
        public bool IsActive { get; set; }
        public User User{get;set;}
        public int UserId{get;set;}
        public UnitOfMeasure UnitOfMeasure{get;set;}
        public int UnitOfMeasureId{get;set;}
        public Category Category{get;set;}
        public int CategoryId{get;set;}
        public ICollection<Photo>  Photos {get;set;}
         public ICollection<Ad_x_DeliveryType>  Ad_x_DeliveryType{get;set;}
         public ICollection<Demand> Demands { get; set; }

    }}