using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using HelpAFamilyOfferAChance.API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.FundraiserRepository
{
    public class FundraiserRepository : IFundraiserRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public FundraiserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AdFundraiser(Fundraiser fundraiser)
        {
            _context.Fundraisers.Add(fundraiser);
        }

        public void DeleteFundraiser(Fundraiser fundraiser)
        {
            _context.Fundraisers.Remove(fundraiser);
        }

        public async Task<PagedList<FundraiserDto>> GetActiveFundraisersByUserIdAsync(AppParams appParams, int id)
        {
            var query = _context.Fundraisers.AsQueryable();
            query = query.Where(fundraiser => fundraiser.IsValidated == true);
            query = query.Where(fundraiser => fundraiser.IsRejected == false);
            query = query.Where(fundraiser => fundraiser.UserId == id);

            query = appParams.OrderBy switch
            {
                "newest" => query.OrderBy(fundraiser => fundraiser.CreatedAt),
                "oldest" => query.OrderByDescending(fundraiser => fundraiser.CreatedAt),
                _ => query
            };

            return await PagedList<FundraiserDto>.CreateAsync(query.ProjectTo<FundraiserDto>(_mapper.ConfigurationProvider).AsNoTracking(), appParams.PageNumber, appParams.PageSize);
        }

        public async Task<PagedList<FundraiserDto>> GetAllInactiveFundraisersAsync(AppParams appParams)
        {
            var query = _context.Fundraisers.AsQueryable();
            query = query.Where(fundraiser => fundraiser.IsValidated == false);
            query = query.Where(fundraiser => fundraiser.IsRejected == false);

            query = appParams.OrderBy switch
            {
                "newest" => query.OrderBy(fundraiser => fundraiser.CreatedAt),
                "oldest" => query.OrderByDescending(fundraiser => fundraiser.CreatedAt),
                _ => query
            };

            return await PagedList<FundraiserDto>.CreateAsync(query.ProjectTo<FundraiserDto>(_mapper.ConfigurationProvider).AsNoTracking(), appParams.PageNumber, appParams.PageSize);
        
        }

        public async Task<Fundraiser> GetFundraiserByIdAsync(int id)
        {
            return await _context.Fundraisers.Where(fundraiser => fundraiser.Id == id).SingleOrDefaultAsync();
        }

        public async Task<FundraiserDto> GetFundraiserDtoByIdAsync(int id)
        {
            return await _context.Fundraisers.Where(fundraiser => fundraiser.Id == id).ProjectTo<FundraiserDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<PagedList<FundraiserDto>> GetFundraisersAsync(AppParams appParams)
        {
            var query = _context.Fundraisers.AsQueryable();
            query = query.Where(fundraiser => fundraiser.IsValidated == true);
            query = query.Where(fundraiser => fundraiser.IsRejected == false);

            query = appParams.OrderBy switch
            {
                "newest" => query.OrderBy(fundraiser => fundraiser.CreatedAt),
                "oldest" => query.OrderByDescending(fundraiser => fundraiser.CreatedAt),
                _ => query
            };

            return await PagedList<FundraiserDto>.CreateAsync(query.ProjectTo<FundraiserDto>(_mapper.ConfigurationProvider).AsNoTracking(), appParams.PageNumber, appParams.PageSize);
        
        }

        public async Task<IEnumerable<FundraiserDto>> GetFundraisersByUserIdAsync(int id)
        {
            return await _context.Fundraisers.Where(fundraiser => fundraiser.UserId == id).ProjectTo<FundraiserDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<PagedList<FundraiserDto>> GetInactiveFundraisersByUserIdAsync(AppParams appParams, int id)
        {
            var query = _context.Fundraisers.AsQueryable();
            query = query.Where(fundraiser => fundraiser.IsValidated == false);
            query = query.Where(fundraiser => fundraiser.IsRejected == false);
            query = query.Where(fundraiser => fundraiser.UserId == id);

            query = appParams.OrderBy switch
            {
                "newest" => query.OrderBy(fundraiser => fundraiser.CreatedAt),
                "oldest" => query.OrderByDescending(fundraiser => fundraiser.CreatedAt),
                _ => query
            };

            return await PagedList<FundraiserDto>.CreateAsync(query.ProjectTo<FundraiserDto>(_mapper.ConfigurationProvider).AsNoTracking(), appParams.PageNumber, appParams.PageSize);
        
        }

        public async Task<PagedList<FundraiserDto>> GetRejectedFundraisersByUserIdAsync(AppParams appParams, int id)
        {
            var query = _context.Fundraisers.AsQueryable();
            query = query.Where(fundraiser => fundraiser.IsValidated == true);
            query = query.Where(fundraiser => fundraiser.IsRejected == true);
            query = query.Where(fundraiser => fundraiser.UserId == id);

            query = appParams.OrderBy switch
            {
                "newest" => query.OrderBy(fundraiser => fundraiser.CreatedAt),
                "oldest" => query.OrderByDescending(fundraiser => fundraiser.CreatedAt),
                _ => query
            };

            return await PagedList<FundraiserDto>.CreateAsync(query.ProjectTo<FundraiserDto>(_mapper.ConfigurationProvider).AsNoTracking(), appParams.PageNumber, appParams.PageSize);
        
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void UpdateFundraiser(Fundraiser fundraiser)
        {
            _context.Entry(fundraiser).State = EntityState.Modified;
        }
    }
}