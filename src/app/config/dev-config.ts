import { Config } from '../services/config.service';

export const config: Config = {
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
