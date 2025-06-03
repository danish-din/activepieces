import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getServerFriendlyName = createAction({
  name: 'get_server_friendly_name',
  displayName: 'Get Server Friendly Name',
  description: 'Get the name of the Plex Media Server.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_server_friendly_name', {});
    return response;
  },
});