import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getGeoipLookup = createAction({
  name: 'get_geoip_lookup',
  displayName: 'Get GeoIP Lookup',
  description: 'Get the geolocation info for an IP address.',
  auth: tautulliAuth,
  props: {
    ipAddress: Property.ShortText({
      displayName: 'IP Address',
      required: true,
      description: 'The IP address to look up.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_geoip_lookup', {
      ip_address: propsValue.ipAddress,
    });
    return response;
  },
});