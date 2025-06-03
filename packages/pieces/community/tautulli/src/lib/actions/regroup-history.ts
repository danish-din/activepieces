import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const regroupHistory = createAction({
  name: 'regroup_history',
  displayName: 'Regroup History',
  description: 'Regroup play history in the database.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    await client.call('regroup_history', {});
  },
});