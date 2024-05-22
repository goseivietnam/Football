using N.Model.Entities;
using N.Repository.FieldServiceFeeRepository;
using N.Service.Common.Service;
using N.Service.FieldServiceFeeService.Dto;
using N.Service.Common;
using N.Service.Dto;
using Microsoft.EntityFrameworkCore;
using N.Repository;
using N.Repository.BookingRepository;
using N.Repository.ServiceFeeRepository;

namespace N.Service.FieldServiceFeeService
{
    public class FieldServiceFeeService : Service<FieldServiceFee>, IFieldServiceFeeService
    {
        private readonly IBookingRepository _bookingService;
        private readonly IServiceFeeRepository _ServiceFeeService;

        public FieldServiceFeeService(
            IFieldServiceFeeRepository fieldServiceFeeRepository,
            IBookingRepository bookingService,
            IServiceFeeRepository ServiceFeeService
            ) : base(fieldServiceFeeRepository)
        {
            this._bookingService = bookingService;
            this._ServiceFeeService = ServiceFeeService;
        }

        public async Task<DataResponse<PagedList<FieldServiceFeeDto>>> GetByFieldIdDto(Guid id)
        {
            var book = _bookingService.GetQueryable().FirstOrDefault(x => x.Id == id);

            var query = from q in GetQueryable()
                               join f in _ServiceFeeService.GetQueryable()
                               on q.ServiceFeeId equals f.Id
                               select new FieldServiceFeeDto
                               {
                                   Id = q.Id,
                                   FieldId = q.FieldId,
                                   ServiceName = f.Name,
                                   Price = q.Price,
                                   BookingId = id
                               };

            query = query.Where(x => x.FieldId == book.FieldId);

            var result = await PagedList<FieldServiceFeeDto>.CreateAsync(query, new FieldServiceFeeSearch());

            return new DataResponse<PagedList<FieldServiceFeeDto>>()
            {
                Success = true,
                Data = result,
            };

            
        }

        public async Task<DataResponse<PagedList<FieldServiceFeeDto>>> GetData(FieldServiceFeeSearch search)
        {
            try
            {
                var query = from q in GetQueryable()
                            select new FieldServiceFeeDto()
                            {
                                Id = q.Id,
                                CreatedDate = q.CreatedDate,
                            };

                query = query.OrderByDescending(x => x.CreatedDate);
                var result = await PagedList<FieldServiceFeeDto>.CreateAsync(query, search);
                return new DataResponse<PagedList<FieldServiceFeeDto>>()
                {
                    Data = result,
                    Message = "Success"
                };

            }
            catch (Exception ex)
            {
                return DataResponse<PagedList<FieldServiceFeeDto>>.False(ex.Message);
            }

        }

        public async Task<DataResponse<FieldServiceFeeDto>> GetDto(Guid id)
        {
            try
            {
                var item = await (from q in GetQueryable()
                            select new FieldServiceFeeDto()
                            {
                                Id = q.Id,
                            }).FirstOrDefaultAsync();

                return new DataResponse<FieldServiceFeeDto>()
                {
                    Success = true,
                    Data = item,
                };

            }
            catch (Exception ex)
            {
                return DataResponse<FieldServiceFeeDto>.False(ex.Message);
            }
        }

    }
}
