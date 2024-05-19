using N.Model.Entities;
using N.Repository.BookingRepository;
using N.Repository.InviteRepository;
using N.Repository.NDirectoryRepository;
using N.Repository.TeamRepository;
using N.Service.BookingService;
using N.Service.Common;
using N.Service.Common.Service;
using N.Service.Dto;
using N.Service.InviteService.Dto;

namespace N.Service.InviteService
{
    public class InviteService : Service<Invite>, IInviteService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IBookingService _bookingService;
        private readonly IFieldRepository _fieldRepository;
        private readonly IBookingRepository _bookingRepository;

        public InviteService(
            IUserRepository userRepository,
            ITeamRepository teamRepository,
            IInviteRepository inviteRepository,
            IBookingService bookingService,
            IFieldRepository fieldRepository,
            IBookingRepository bookingRepository
            ) : base(inviteRepository)
        {
            this._userRepository = userRepository;
            this._teamRepository = teamRepository;
            this._bookingService = bookingService;
            this._fieldRepository = fieldRepository;
            this._bookingRepository = bookingRepository;
        }

        public async Task<DataResponse<PagedList<InviteDto>>> GetData(InviteSearch search)
        {
            try
            {
                var query = from q in GetQueryable()
                            join team in _teamRepository.GetQueryable()
                            on q.TeamId equals team.Id
                            join inviteTeam in _teamRepository.GetQueryable()
                            on q.InviteTeamId equals inviteTeam.Id
                            join book in _bookingRepository.GetQueryable()
                            on team.UserId equals book.UserId
                            join field in _fieldRepository.GetQueryable()
                            on book.FieldId equals field.Id                           
                            select new InviteDto()
                            {
                                Id = q.Id,
                                Accepted = q.Accepted,
                                Description = q.Description,
                                EnviteTime = q.EnviteTime,
                                InviteTeamId = q.InviteTeamId,
                                TeamId = q.TeamId,
                                Team = team,
                                BookingId = q.BookingId,
                                InviteTeam = inviteTeam,
                                CreatedDate = q.CreatedDate,
                                FieldName = field.Name,
                                FieldAddress = field.Address,
                                RentalPeriod = $"{book.Start} - {book.End}"
                            };

                if (search.All == true)
                {

                }
                else
                {
                    query = query.Where(x => x.Accepted == search.Accept);
                }
                if (search.UserId.HasValue)
                {
                    query = query.Where(x => x.InviteTeam != null && x.InviteTeam.UserId == search.UserId);

                }
                if (search.UserInviteId.HasValue)
                {
                    query = query.Where(x => x.Team != null && x.Team.UserId == search.UserId);

                }
                query = query.OrderByDescending(x => x.CreatedDate);

                var result = PagedList<InviteDto>.Create(query, search);

                foreach (var item in result.Items)
                {
                    if (item.BookingId.HasValue)
                    {
                        item.Booking = (await _bookingService.GetDto(item.BookingId.Value)).Data;
                    }
                }

                return new DataResponse<PagedList<InviteDto>>()
                {
                    Data = result,
                    Message = "Success"
                };

            }
            catch (Exception ex)
            {
                return DataResponse<PagedList<InviteDto>>.False(ex.Message);
            }

        }

        public async Task<DataResponse<InviteDto>> GetDto(Guid id)
        {
            try
            {
                var item = (from q in GetQueryable()
                            join team in _teamRepository.GetQueryable()
                            on q.TeamId equals team.Id
                            join inviteTeam in _teamRepository.GetQueryable()
                            on q.InviteTeamId equals inviteTeam.Id
                            select new InviteDto()
                            {
                                Id = q.Id,
                                Accepted = q.Accepted,
                                Description = q.Description,
                                EnviteTime = q.EnviteTime,
                                InviteTeamId = q.InviteTeamId,
                                TeamId = q.TeamId,
                                CreatedDate = q.CreatedDate,
                                BookingId = q.BookingId,
                                Team = team,
                                InviteTeam = inviteTeam,
                            }).FirstOrDefault();

                if (item != null)
                {
                    if (item.BookingId.HasValue)
                    {
                        item.Booking = (await _bookingService.GetDto(item.BookingId.Value)).Data;
                    }
                }

                return new DataResponse<InviteDto>()
                {
                    Success = true,
                    Data = item,
                };

            }
            catch (Exception ex)
            {
                return DataResponse<InviteDto>.False(ex.Message);
            }
        }

    }
}
