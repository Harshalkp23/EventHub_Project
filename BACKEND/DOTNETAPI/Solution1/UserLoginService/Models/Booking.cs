using System;
using System.Collections.Generic;

namespace UserLoginService.Models;

public partial class Booking
{
    public int BookingId { get; set; }

    public DateTime BookingDate { get; set; }

    public int? NoOfSeats { get; set; }

    public decimal? Price { get; set; }

    public decimal? TotalCost { get; set; }

    public int UserId { get; set; }

    public int EventId { get; set; }

    public virtual Event Event { get; set; } = null!;

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual User User { get; set; } = null!;
}
