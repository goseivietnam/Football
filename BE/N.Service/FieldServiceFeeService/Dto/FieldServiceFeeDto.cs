using N.Model.Entities;

namespace N.Service.FieldServiceFeeService.Dto
{
    public class FieldServiceFeeDto : FieldServiceFee
    {
        public string? ServiceName { get; set; }

        public Guid? FieldId { get; set; }

        public Guid? BookingId { get; set; }
    }
}
