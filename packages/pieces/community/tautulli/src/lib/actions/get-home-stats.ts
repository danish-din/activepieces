// tautulli/src/lib/actions/get-home-stats.ts
import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getHomeStats = createAction({
  name: 'get-home-stats',
  displayName: 'Get Home Stats',
  description: 'Get high-level server statistics including top users, top items, and total watch time.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_home_stats');
    return response;
  },
});
