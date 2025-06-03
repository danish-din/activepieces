import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getServerList = createAction({
  name: 'get_server_list',
  displayName: 'Get Server List',
  description: 'Get all your servers that are published to Plex.tv.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_server_list', {});
    return response;
  },
});