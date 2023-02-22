import { Config } from '../services/config.service';

export const config: Config = {
  apiConfig: {
    // baseUrl: 'https://peg.nu/api',
    baseUrl: 'http://localhost:8080/api',
  },
  shortlinkConfig: {
    // baseUrl: 'https://peg.nu',
    baseUrl: 'http://localhost:8080',
  },
  keycloakConfig: {
    clientId: 'pegnu-short',
    url: 'https://auth.pegnu.dev',
    realm: 'pegnu',
  },
  additionalScripts: [
    {
      url: 'https://xn--n8jaq7c.pegnu.dev/mitomeru.js',
      attributes: {
        async: '',
        defer: '',
        'data-website-id': 'e0ca7f5d-d47d-49fe-be36-d6b97dd765be',
        'data-domains': 'short.peg.nu',
      },
      enabled: false,
    },
  ],
};
