import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getServerPref = createAction({
  name: 'get_server_pref',
  displayName: 'Get Server Preference',
  description: 'Get a specified PMS server preference.',
  auth: tautulliAuth,
  props: {
    pref: Property.ShortText({
      displayName: 'Preference Name',
      required: true,
      description: 'The name of the preference to retrieve.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_server_pref', {
      pref: propsValue.pref,
    });
    return response;
  },
});