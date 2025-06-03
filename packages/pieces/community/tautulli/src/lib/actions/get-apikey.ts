import { createAction, Property } from '@activepieces/pieces-framework';
import { makeClient } from '../common';

export const getApiKey = createAction({
  name: 'get_apikey',
  displayName: 'Get API Key',
  description: 'Retrieve the API key. Username and password are required if authentication is enabled.',
  props: {
    baseUrl: Property.ShortText({
      displayName: 'Base URL',
      required: true,
      description: 'The base URL of your Tautulli server (e.g., http://localhost:8181).',
    }),
    username: Property.ShortText({
      displayName: 'Username',
      required: false,
      description: 'Your Tautulli username.',
    }),
    password: Property.ShortText({
      displayName: 'Password',
      required: false,
      description: 'Your Tautulli password.',
    }),
  },
  async run({ propsValue }) {
    const client = makeClient({ baseUrl: propsValue.baseUrl, apiKey: '' }); // Use the provided base URL
    const response = await client.call('get_apikey', {
      username: propsValue.username ?? '',
      password: propsValue.password ?? '',
    });
    return response.apikey;
  },
});