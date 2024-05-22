using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace N.Model.Entities
{
    public class ServiceFeePayment : Entity
    {
        public Guid? FieldServiceFeeId { get; set; }
        public Guid? BookingId { get; set; }
        public DateTime? DateTime { get; set; }
        public string? Description { get; set; }
        public float? Price { get; set; }
        public int? Quantity { get; set; }
        public string? ServiceName {  get; set; }
    }
}
