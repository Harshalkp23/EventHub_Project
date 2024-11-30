using System;
using System.Collections.Generic;

namespace UserLoginService.Models;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Fname { get; set; }

    public string? Lname { get; set; }

    public DateOnly? Dob { get; set; }

    public long AadharNo { get; set; } 

    public string Email { get; set; } = null!;

    public long Pincode { get; set; }

    public string? Address { get; set; }

    public string? MobileNo { get; set; }

    public int Rid { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<Booking>? Bookings { get; set; } 

    public virtual ICollection<Event>? Events { get; set; }

    public virtual ICollection<Feedback>? Feedbacks { get; set; } 

    public virtual ICollection<Payment>? Payments { get; set; } 

    public virtual Role? RidNavigation { get; set; } = null!;
}
