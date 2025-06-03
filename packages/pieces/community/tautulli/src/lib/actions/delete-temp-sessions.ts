import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_temp_sessions = createAction({
  name: 'delete-temp-sessions',
  displayName: 'Delete Temp Sessions',
  description: 'Flush out all of the temporary sessions in the database.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_temp_sessions', {});
    return response;
  },
});
