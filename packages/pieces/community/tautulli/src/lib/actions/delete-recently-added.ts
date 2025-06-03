import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_recently_added = createAction({
  name: 'delete-recently-added',
  displayName: 'Delete Recently Added',
  description: 'Flush out all of the recently added items in the database.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_recently_added', {});
    return response;
  },
});
