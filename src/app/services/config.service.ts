import { Injectable } from '@angular/core';
import { config as devConfig } from '../config/dev-config';

export interface Config {
  keycloakConfig: {
    clientId: string,
    url: string,
    realm: string,
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

  private configs: ConfigEntry[] = [
    {
      name: 'dev',
      match: [/^localhost$/],
      value: devConfig,
    },
  ];

  constructor() {
  }

  public get config(): Config {
    return { ...this.getConfigByHostname() };
  }

  private getConfigByHostname(): Config {
    if (this.configs.length === 0) {
      throw new Error('No configs found');
    }

    const hostname = window.location.hostname;

    for (const config of this.configs) {
      for (const match of config.match) {
        if (match.test(hostname)) {
          return config.value;
        }
      }
    }

    throw new Error('No config found for hostname: ' + hostname);
  }
}
