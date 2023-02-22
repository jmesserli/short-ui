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
  analyticsConfig: {
    plausible: {
      enabled: false,
      domain: 'short.peg.nu',
      scriptUrl: 'https://canihaz.pegnu.dev/js/index.js',
    },
  },
};
