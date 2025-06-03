import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { TautulliAuthValue } from '../common/types';

export const getServerInfo = createAction({
  name: 'get-server-info',
  displayName: 'Get Server Info',
  description: 'Retrieve detailed information about the Plex server from Tautulli.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as TautulliAuthValue);
    const response = await client.call('get_server_info');
    return response;
  },
});
