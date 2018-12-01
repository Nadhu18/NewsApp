using Newtonsoft.Json;
using System.Collections.Generic;

namespace server.Data.Models
{
    public class NewsApiModel
    {
        [JsonProperty(PropertyName = "totalResults")]
        public int TotalResults { get; set; }

        [JsonProperty(PropertyName = "articles")]
        public List<Article> Articles { get; set; }
    }
}
