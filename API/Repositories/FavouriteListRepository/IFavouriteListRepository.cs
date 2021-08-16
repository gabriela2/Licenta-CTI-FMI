using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Repositories.FavouriteListRepository
{
    public interface IFavouriteListRepository
    {
        void AdToFavouriteList(FavouriteList favouriteList);
        void DeleteFromFavouriteList(FavouriteList favouriteList);
        Task<IEnumerable<FavouriteListDto>> GetFavouriteListsDtoByUserIdAsync(int id);
        Task<PagedList<FavouriteListDto>> GetFavouriteListsByUserIdAsync(AppParams appParams, int id);
        Task<FavouriteList> GetFavouriteListByIdAsync(int id);
        Task<FavouriteListDto> GetFavouriteFundraiserAsync(int userId, int fundraiserId);
        Task<FavouriteListDto> GetFavouriteAdAsync(int userId, int adId);
        Task<bool> SaveAllAsync();
        
    }
}