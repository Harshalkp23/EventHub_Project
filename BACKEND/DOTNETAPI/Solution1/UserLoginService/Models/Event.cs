using System;
using System.Collections.Generic;

namespace UserLoginService.Models;

public partial class Event
{
    public int EventId { get; set; }

    public string? EventName { get; set; }

    public string? Description { get; set; }

    public DateOnly? Date { get; set; }

    public double? Price { get; set; }

    public string? Address { get; set; }

    public string? City { get; set; }

    public long? Pincode { get; set; }

    public int? NoOfSeats { get; set; }

    public int? Catid { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual Category? Cat { get; set; }

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
}
