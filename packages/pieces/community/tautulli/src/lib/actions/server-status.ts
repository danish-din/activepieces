import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const serverStatus = createAction({
  name: 'server_status',
  displayName: 'Server Status',
  description: 'Get the current status of Tautulli\'s connection to the Plex server.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('server_status', {});
    return response;
  },
});