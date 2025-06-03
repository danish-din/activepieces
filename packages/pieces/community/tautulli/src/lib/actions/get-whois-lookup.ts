import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getWhoisLookup = createAction({
  name: 'get-whois-lookup',
  displayName: 'Get Whois Lookup',
  description: 'Lookup location or metadata for a specific IP address from user activity.',
  auth: tautulliAuth,
  props: {
    ipAddress: Property.ShortText({
      displayName: 'IP Address',
      required: true,
      description: 'Enter the IP address to look up.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_whois_lookup', {
      ip_address: propsValue.ipAddress,
    });
    return response;
  },
});
