import { HttpMethod, httpClient, HttpRequest } from '@activepieces/pieces-common';
import { TautulliAuthValue } from './types';

export class TautulliClient {
  constructor(private auth: TautulliAuthValue) {}

  private buildUrl(cmd: string): string {
    const base = this.auth.baseUrl.endsWith('/')
      ? this.auth.baseUrl.slice(0, -1)
      : this.auth.baseUrl;
    return `${base}/api/v2?apikey=${this.auth.apiKey}&cmd=${cmd}`;
  }
  async getServerFriendlyName(): Promise<string> {
    const request: HttpRequest = {
      method: HttpMethod.GET,
      url: `${this.auth.baseUrl}/api/v2?apikey=${this.auth.apiKey}&cmd=get_server_friendly_name`,
    };
  
    const response = await httpClient.sendRequest(request);
  
    if (response.status !== 200 || response.body?.response?.result !== 'success') {
      throw new Error(
        response.body?.response?.message || 'Unknown error while validating Tautulli server name'
      );
    }
  
    return response.body.response.data;
  }
  

  async call(cmd: string, params: Record<string, string> = {}) {
    const url = new URL(this.buildUrl(cmd));
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  
    const request: HttpRequest = {
      method: HttpMethod.GET,
      url: url.toString(),
    };
  
    const res = await httpClient.sendRequest(request);
    return res.body;
  }
  

  async authenticate() {
    return this.call('get_server_friendly_name');
  }
}

export const makeClient = (auth: TautulliAuthValue) => new TautulliClient(auth);
