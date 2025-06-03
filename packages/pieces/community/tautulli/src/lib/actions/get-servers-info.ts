import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getServersInfo = createAction({
  name: 'get_servers_info',
  displayName: 'Get Servers Info',
  description: 'Get info about the Plex Media Server.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_servers_info', {});
    return response;
  },
});