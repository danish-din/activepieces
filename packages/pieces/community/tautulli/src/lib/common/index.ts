import { PiecePropValueSchema, Property } from '@activepieces/pieces-framework';
import { makeClient } from './client';
import { tautulliAuth } from '../..';

export const tautulliCommon = {
  serverName: Property.Dropdown({
    displayName: 'Server Friendly Name',
    required: true,
    refreshers: [],
    options: async (propsValue) => {
      const auth = propsValue['auth'] as PiecePropValueSchema<typeof tautulliAuth>;

      if (!auth) {
        return {
          disabled: true,
          placeholder: 'Please connect your account first',
          options: [],
        };
      }

      const client = makeClient(auth);
      const res = await client.call('server_friendly_name');

      return {
        disabled: false,
        options: [
          {
            label: res?.response?.friendly_name ?? 'Unknown Server',
            value: res?.response?.friendly_name ?? 'unknown',
          },
        ],
      };
    },
  }),
};

export { makeClient };
