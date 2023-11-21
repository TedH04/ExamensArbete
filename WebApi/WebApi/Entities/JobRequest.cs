namespace WebApi.Entities
{
    public class JobRequest
    {
        public int Id { get; set; }
        public string? CustomerName { get; set; }
        public string? JobTitle { get; set; }
        public string? JobDescription { get; set; }
        public string? JobAddress { get; set; }
        public string? JobCity { get; set; }
        public string? JobZip { get; set; }
        public string? ContactEmail { get; set; }
        public bool IsCompany { get; set; }

    }
}
