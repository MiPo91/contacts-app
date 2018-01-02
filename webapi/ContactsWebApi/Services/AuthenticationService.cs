using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using ContactsWebApi.Models;
using Microsoft.Extensions.Options;

namespace ContactsWebApi.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly AzureSettings _azureSettings;

        public AuthenticationService(IOptions<AzureSettings> azureSettings)
        {
            _azureSettings = azureSettings.Value;
        }

        public async Task<AccessToken> RequestAccessToken(Authentication authentication)
        {
            var endpoint = _azureSettings.Endpoint;
            var authenticationParams = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("client_id", _azureSettings.ApplicationId),
                new KeyValuePair<string, string>("resource", _azureSettings.ApplicationId),
                new KeyValuePair<string, string>("grant_type", _azureSettings.GrantType),
                new KeyValuePair<string, string>("client_secret", _azureSettings.Key)
            };
            authenticationParams.Insert(0, new KeyValuePair<string, string>("username", authentication.Username));
            authenticationParams.Insert(0, new KeyValuePair<string, string>("password", authentication.Password));

            AccessToken token = null;
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Add("Cache-Control", "no-cache");
                HttpContent content = new FormUrlEncodedContent(authenticationParams);
                var response = await httpClient.PostAsync(endpoint, content);
                
                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    token = JsonConvert.DeserializeObject<AccessToken>(data);
                }
            }
            return token;
        }
    }
}
