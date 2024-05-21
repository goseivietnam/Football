using N.Model.Entities;

namespace N.Service.TeamService.Dto
{
    public class TeamDto : Team
    {
        public Field? Field { get; set; }

        public Guid? BookingId { get; set; }

        /// <summary>
        /// Tên sân
        /// </summary>
        public string? FieldName { get; set; }

        /// <summary>
        /// Địa chỉ sân
        /// </summary>
        public string? FieldAddress { get; set; }

        /// <summary>
        /// Thời gian thuê sân
        /// </summary>
        public string? RentalPeriod { get; set; }
    }
}
