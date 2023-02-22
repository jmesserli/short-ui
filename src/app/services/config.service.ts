import { Injectable } from '@angular/core';
import { config as devConfig } from '../config/dev-config';
import { config as prdConfig } from '../config/prd-config';

export interface Config {
  apiConfig: {
    baseUrl: string;
  };
  shortlinkConfig: {
    baseUrl: string;
  };
  keycloakConfig: {
    clientId: string;
    url: string;
    realm: string;
  };
  analyticsConfig: {
    plausible: {
      enabled: boolean;
      domain?: string;
      scriptUrl?: string;
    };
  };
}

interface ConfigEntry {
  name: string;
  match: RegExp[];
  value: Config;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private static readonly configs: ConfigEntry[] = [
    {
      name: 'dev',
      match: [/^localhost$/],
      value: devConfig,
    },
    {
      name: 'prd',
      match: [/^short.peg.nu$/],
      value: prdConfig,
    },
  ];
  private readonly activeConfig: ConfigEntry;

  constructor() {
    const hostname = window.location.hostname;

    for (const config of ConfigService.configs) {
      for (const match of config.match) {
        if (match.test(hostname)) {
          this.activeConfig = config;
          console.log(`activated configuration '${config.name}'`);
          return;
        }
      }
    }

    throw new Error('No config found for hostname: ' + hostname);
  }

  public get config(): Config {
    return { ...this.activeConfig.value };
  }
}
