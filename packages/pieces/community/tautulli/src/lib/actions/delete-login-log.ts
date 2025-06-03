import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_login_log = createAction({
  name: 'delete-login-log',
  displayName: 'Delete Login Log',
  description: 'Delete the Tautulli login logs.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_login_log', {});
    return response;
  },
});
