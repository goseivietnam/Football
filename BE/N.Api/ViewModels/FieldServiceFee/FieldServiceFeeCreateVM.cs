using Microsoft.AspNetCore.Identity;

namespace N.Api.ViewModels
{
    public class FieldServiceFeeCreateVM
    {
        public Guid? ServiceFeeId { get; set; }
        public Guid? FieldId { get; set; }
        public float? Price { get; set; }
        public Guid? BookingId { get; set; }
        public int Quantity { get; set; }
        public string ServiceName { get; set; }
    }
}