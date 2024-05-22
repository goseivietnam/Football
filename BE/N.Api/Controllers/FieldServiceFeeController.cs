using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using N.Api.ViewModels;
using N.Model.Entities;
using N.Service.FieldServiceFeeService;
using N.Service.FieldServiceFeeService.Dto;
using N.Service.Common;
using N.Service.Dto;
using N.Service.ServiceFeePaymentService;
using N.Service.FieladService;
using N.Service.ServiceFeeService;
using N.Service.BookingService;

namespace N.Controllers
{
    [Route("api/[controller]")]
    public class FieldServiceFeeController : NController
    {
        private readonly IFieldServiceFeeService _fieldServiceFeeService;
        private readonly IServiceFeePaymentService _serviceFeePaymentService;
        private readonly IBookingService _bookingService;
        private readonly IServiceFeeService _ServiceFeeService;

        private readonly IMapper _mapper;
        private readonly ILogger<FieldServiceFeeController> _logger;


        public FieldServiceFeeController(
            IFieldServiceFeeService fieldServiceFeeService,
            IServiceFeePaymentService serviceFeePaymentService,
            IMapper mapper,
            ILogger<FieldServiceFeeController> logger,
            IBookingService bookingService,
            IServiceFeeService ServiceFeeService
            )
        {
            this._fieldServiceFeeService = fieldServiceFeeService;
            this._serviceFeePaymentService = serviceFeePaymentService;
            this._bookingService = bookingService;
            this._ServiceFeeService = ServiceFeeService;
            this._mapper = mapper;
            _logger = logger;
        }

        [HttpPost("Create")]
        public async Task<DataResponse<FieldServiceFee>> Create([FromBody] FieldServiceFeeCreateVM model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var fieldServiceId = Guid.NewGuid();

                    var fieldService = _fieldServiceFeeService.GetQueryable()
                        .FirstOrDefault(x => x.ServiceFeeId == model.ServiceFeeId && x.FieldId == model.FieldId);

                    if (fieldService != null)
                    {
                        return new DataResponse<FieldServiceFee>() { Success = false };
                    }

                    var entity = new FieldServiceFee()
                    {
                        Id = fieldServiceId,
                        Price = model.Price,
                        FieldId = model.FieldId,
                        ServiceFeeId = model.ServiceFeeId,
                        Quantity = model.Quantity
                    };

                    await _fieldServiceFeeService.Create(entity);

                    //Thêm dòng vào ServiceFeePayment
                    if (model.BookingId.HasValue)
                    {
                        var serviceFeePaymentEntity = new ServiceFeePayment
                        {
                            FieldServiceFeeId = fieldServiceId,
                            BookingId = model.BookingId,
                            Price = model.Price,
                            Quantity = model.Quantity,
                            ServiceName = model.ServiceName,
                            DateTime = DateTime.Now,
                            CreatedDate = DateTime.Now
                        };

                        await _serviceFeePaymentService.Create(serviceFeePaymentEntity);
                    }                 

                    return new DataResponse<FieldServiceFee>() { Data = entity, Success = true };
                }
                catch (Exception ex)
                {
                    return DataResponse<FieldServiceFee>.False("Error", new string[] { ex.Message });
                }
            }
            return DataResponse<FieldServiceFee>.False("Some properties are not valid", ModelStateError);
        }

        [HttpPost("Edit")]
        public async Task<DataResponse<FieldServiceFee>> Edit([FromBody] FieldServiceFeeEditVM model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var entity = _fieldServiceFeeService.GetById(model.Id);
                    if (entity == null)
                        return DataResponse<FieldServiceFee>.False("FieldServiceFee not found");
                    entity.Price = model.Price;
                    entity.Quantity = model.Quantity;
                    await _fieldServiceFeeService.Update(entity);
                    return new DataResponse<FieldServiceFee>() { Data = entity, Success = true };
                }
                catch (Exception ex)
                {
                    DataResponse<FieldServiceFee>.False(ex.Message);
                }
            }
            return DataResponse<FieldServiceFee>.False("Some properties are not valid", ModelStateError);
        }
        [HttpGet("Get/{id}")]
        public async Task<DataResponse<FieldServiceFeeDto>> Get(Guid id)
        {
            return await _fieldServiceFeeService.GetDto(id);
        }

        [HttpGet("GetByFieldId/{id}")]
        public async Task<DataResponse<PagedList<FieldServiceFeeDto>>> GetByFieldId(Guid id)
        {
             
            return await _fieldServiceFeeService.GetByFieldIdDto(id);
        }

        [HttpPost("GetData")]
        public async Task<DataResponse<PagedList<FieldServiceFeeDto>>> GetData([FromBody] FieldServiceFeeSearch search)
        {
            return await _fieldServiceFeeService.GetData(search);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<DataResponse> Delete(Guid id)
        {
            try
            {
                var entity = _fieldServiceFeeService.GetById(id);
                await _fieldServiceFeeService.Delete(entity);
                return new DataResponse()
                {
                    Success = true,
                    Message = "Success",
                };
            }
            catch (Exception ex)
            {

                return DataResponse.False(ex.Message);
            }
        }


    }
}