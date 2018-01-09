using System;

namespace Cornware.Api.Model
{
	public class ClientLetterCard
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public long Number { get; set; }
    }
}
