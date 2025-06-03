import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getTautulliInfo = createAction({
  name: 'get_tautulli_info',
  displayName: 'Get Tautulli Info',
  description: 'Get info about the Tautulli server.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_tautulli_info', {});
    return response;
  },
});