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

namespace API.Repositories.DemandRepository
{
    public class DemandRepository : IDemandRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DemandRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddDemand(Demand demand)
        {
            _context.Demands.Add(demand);
        }

        public void DeleteDemand(Demand demand)
        {
            _context.Demands.Remove(demand);
        }

        public async Task<PagedList<DemandDto>> GetAllDemandsByAdIdAsync(DemandsParams demandsParams, int id)
        {
            var query =  _context.Demands.AsQueryable();
            query = query.Where(demand => demand.IsApproved==true);
            query = query.Where(demand => demand.AdId==id);
            query = demandsParams.OrderBy switch {
                "newest" => query.OrderBy(demand =>demand.CreatedAt),
                "oldest" => query.OrderByDescending(demand=>demand.CreatedAt),
                _ => query
            };
            if(demandsParams.DeliveryTypeSelected!=null){
            query = query.Where(demand => demand.DeliveryTypeSelected == demandsParams.DeliveryTypeSelected);
            }
            query = demandsParams.SortBy switch {
                "approve" => query.Where(demand => demand.IsDeclined==false),
                "declined" => query.Where(demand => demand.IsDeclined==true),
                _ => query
            };


            return await PagedList<DemandDto>.CreateAsync(query.ProjectTo<DemandDto>(_mapper.ConfigurationProvider).AsNoTracking(), demandsParams.PageNumber,demandsParams.PageSize);
        }

        public async Task<PagedList<DemandDto>> GetApprovedDemandsByUserIdAsync(AppParams appParams, int id)
        {
            var query =  _context.Demands.AsQueryable();
            query = query.Where(demand => demand.UserId==id);
            query = query.Where(demand => demand.IsApproved==true);
            query = query.Where(demand => demand.IsDeclined==false);
            query = appParams.OrderBy switch {
                "newest" => query.OrderBy(demand =>demand.CreatedAt),
                "oldest" => query.OrderByDescending(demand=>demand.CreatedAt),
                _ => query
            };

            return await PagedList<DemandDto>.CreateAsync(query.ProjectTo<DemandDto>(_mapper.ConfigurationProvider).AsNoTracking(), appParams.PageNumber,appParams.PageSize);
        }

        public async Task<Demand> GetDemandByIdAsync(int id)
        {
            return await _context.Demands.Where(demand =>demand.Id == id).SingleOrDefaultAsync();
        }

        public async Task<DemandDto> GetDemandDtoByIdAsync(int id)
        {
            return await _context.Demands.Where(demand => demand.Id==id).ProjectTo<DemandDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<DemandDto>> GetDemandsAsync()
        {
            return await _context.Demands.ProjectTo<DemandDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<PagedList<DemandDto>> GetNotApprovedYetDemandsByUserIdAsync(AppParams appParams, int id)
        {
            var query =  _context.Demands.AsQueryable();
            query = query.Where(demand => demand.UserId==id);
            query = query.Where(demand => demand.IsApproved==false);
            query = query.Where(demand => demand.IsDeclined==false);
            query = appParams.OrderBy switch {
                "newest" => query.OrderBy(demand =>demand.CreatedAt),
                "oldest" => query.OrderByDescending(demand=>demand.CreatedAt),
                _ => query
            };

            return await PagedList<DemandDto>.CreateAsync(query.ProjectTo<DemandDto>(_mapper.ConfigurationProvider).AsNoTracking(), appParams.PageNumber,appParams.PageSize);
        }

        public async Task<PagedList<DemandDto>> GetRejectedDemandsByUserIdAsync(AppParams appParams, int id)
        {
            var query =  _context.Demands.AsQueryable();
            query = query.Where(demand => demand.UserId==id);
            query = query.Where(demand => demand.IsApproved==true);
            query = query.Where(demand => demand.IsDeclined==true);
            query = appParams.OrderBy switch {
                "newest" => query.OrderBy(demand =>demand.CreatedAt),
                "oldest" => query.OrderByDescending(demand=>demand.CreatedAt),
                _ => query
            };

            return await PagedList<DemandDto>.CreateAsync(query.ProjectTo<DemandDto>(_mapper.ConfigurationProvider).AsNoTracking(), appParams.PageNumber,appParams.PageSize);
        }

        public async Task<PagedList<DemandDto>> GetUnapprovedDemandsByAdIdAsync(AppParams appParams, int id)
        {
            var query =  _context.Demands.AsQueryable();
            query = query.Where(demand => demand.AdId==id);
            query = query.Where(demand => demand.IsApproved==false);
            query = query.Where(demand => demand.IsDeclined==false);
            query = appParams.OrderBy switch {
                "newest" => query.OrderBy(demand =>demand.CreatedAt),
                "oldest" => query.OrderByDescending(demand=>demand.CreatedAt),
                _ => query
            };

            return await PagedList<DemandDto>.CreateAsync(query.ProjectTo<DemandDto>(_mapper.ConfigurationProvider).AsNoTracking(), appParams.PageNumber,appParams.PageSize);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync()>0;
        }

        public void UpdateDemand(Demand demand)
        {
            _context.Entry(demand).State = EntityState.Modified;
        }
    }
}