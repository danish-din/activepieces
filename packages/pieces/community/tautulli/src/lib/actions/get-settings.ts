import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getSettings = createAction({
  name: 'get_settings',
  displayName: 'Get Settings',
  description: 'Gets all settings from the config file.',
  auth: tautulliAuth,
  props: {
    key: Property.ShortText({
      displayName: 'Config Section Key',
      required: false,
      description: 'Name of a config section to return.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_settings', {
      key: propsValue.key ?? '',
    });
    return response;
  },
});