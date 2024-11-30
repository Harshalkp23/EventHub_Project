using System;
using System.Collections.Generic;

namespace UserLoginService.Models;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public int? Rating { get; set; }

    public string? Comment { get; set; }

    public int? UserId { get; set; }

    public int? EventId { get; set; }

    public virtual Event? Event { get; set; }

    public virtual User? User { get; set; }
}
