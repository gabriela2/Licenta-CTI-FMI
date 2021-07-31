using System.Linq;
using API.DTOs;
using API.Entities;
using AutoMapper;
using HelpAFamilyOfferAChance.API.Entities;

namespace API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, MemberDto>()
                .ForMember(destination => destination.PhotoUrl, options => options.MapFrom(source => source.Photo.Url));

            CreateMap<UserPhoto, UserPhotoDto>();

            CreateMap<Photo, PhotoDto>();

            CreateMap<Ad, AdDto>()
                .ForMember(destination => destination.Url, options => options.MapFrom(source => source.Photos.FirstOrDefault(photo => photo.IsMain).Url))
                .ForMember(destination => destination.UnitOfMeasure, options => options.MapFrom(source => source.UnitOfMeasure.Abbreviation))
                .ForMember(destination => destination.Category, options => options.MapFrom(source => source.Category.Name));

            CreateMap<Ad_x_DeliveryType, Ad_x_DeliveryTypeDto>()
            .ForMember(destination => destination.DeliveryType, options => options.MapFrom(source => source.DeliveryType.Name));
            CreateMap<Demand, DemandDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<DeliveryType, DeliveryTypeDto>();
            CreateMap<UnitOfMeasure, UnitOfMeasureDto>();
            CreateMap<Address, AddressDto>();
            CreateMap<Donation, DonationDto>();
            CreateMap<Fundraiser,FundraiserDto>()
                .ForMember(destination => destination.Url, options => options.MapFrom(source => source.Photos.FirstOrDefault(photo => photo.IsMain).Url));
            CreateMap<UserRating, UserRatingDto>();
            CreateMap<FavouriteList,FavouriteListDto>();
            




        }
    }
}