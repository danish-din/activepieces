import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const refreshLibrariesList = createAction({
  name: 'refresh_libraries_list',
  displayName: 'Refresh Libraries List',
  description: 'Refresh the Tautulli libraries list.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    await client.call('refresh_libraries_list', {});
  },
});