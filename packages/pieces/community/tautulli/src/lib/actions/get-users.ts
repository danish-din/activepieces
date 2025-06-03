// tautulli/src/lib/actions/get-users.ts
import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getUsers = createAction({
  name: 'get-users',
  displayName: 'Get Users',
  description: 'Retrieve a list of all Plex users tracked by Tautulli.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_users');
    return response;
  },
});
