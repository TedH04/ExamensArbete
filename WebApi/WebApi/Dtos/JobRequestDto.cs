﻿using System.ComponentModel.DataAnnotations;

namespace WebApi.Dtos
{
    public class JobRequestDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string? CustomerName { get; set; }
        public string? CustomerPhoneNumber { get; set; }
        public string? CompanyName { get; set; }
        [Required]
        public string? JobTitle { get; set; }
        [Required]
        public string? JobDescription { get; set; }
        [Required]
        public string? JobAddress { get; set; }
        [Required]
        public string? JobCity { get; set; }
        [Required]
        public string? JobZip { get; set; }
        public string? OrgNumber { get; set; }
        [Required]
        public string? ContactEmail { get; set; }
        [Required]
        public bool IsCompany { get; set; }
    }
}
