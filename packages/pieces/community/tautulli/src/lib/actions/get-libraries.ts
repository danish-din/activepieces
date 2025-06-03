import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getLibraries = createAction({
  name: 'get-libraries',
  displayName: 'Get Libraries',
  description: 'Retrieve a list of Plex libraries available in Tautulli.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_libraries');
    return response;
  },
});