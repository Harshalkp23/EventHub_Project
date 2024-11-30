using System;
using System.Collections.Generic;

namespace UserLoginService.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public DateTime? PaymentDate { get; set; }

    public decimal? Amount { get; set; }

    public string? PaymentMode { get; set; }

    public decimal? TransactionId { get; set; }

    public string? Status { get; set; }

    public int? BookingId { get; set; }

    public int? UserId { get; set; }

    public virtual Booking? Booking { get; set; }

    public virtual User? User { get; set; }
}
