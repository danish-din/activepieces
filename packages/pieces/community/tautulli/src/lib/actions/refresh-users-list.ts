import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const refreshUsersList = createAction({
  name: 'refresh_users_list',
  displayName: 'Refresh Users List',
  description: 'Refresh the Tautulli users list.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    await client.call('refresh_users_list', {});
  },
});