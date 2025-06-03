import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common/client';
import { TautulliAuthValue } from '../common/types';

export const getServerIdentity = createAction({
  name: 'get-server-identity',
  displayName: 'Get Server Identity',
  description: 'Get info about the local server.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as TautulliAuthValue);
    const response = await client.call('get_server_identity');
    return response;
  },
});