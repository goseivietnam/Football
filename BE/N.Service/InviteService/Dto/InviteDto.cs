using N.Model.Entities;
using N.Service.BookingService.Dto;

namespace N.Service.InviteService.Dto
{
    public class InviteDto : Invite
    {
        public Team? Team { get; set; }
        public Team? InviteTeam { get; set; }
        public BookingDto? Booking { get; set; }

        /// <summary>
        /// Tên sân
        /// </summary>
        public string? FieldName { get; set; }

        /// <summary>
        /// Địa chỉ sân
        /// </summary>
        public string? FieldAddress {  get; set; }

        /// <summary>
        /// Thời gian thuê sân
        /// </summary>
        public DateTime FieldCreatedDate { get; set; }
    }
}
