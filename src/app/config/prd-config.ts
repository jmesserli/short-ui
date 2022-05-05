import { Config } from '../services/config.service';

export const config: Config = {
  keycloakConfig: {
    clientId: 'short',
    url: 'https://id.peg.nu',
    realm: 'PegNu',
  },
  analyticsConfig: {
    plausible: {
      enabled: true,
      domain: 'short.peg.nu',
      scriptUrl: 'https://canihaz.pegnu.dev/js/index.js',
    },
  },
};
