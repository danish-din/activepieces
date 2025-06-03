import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_cache = createAction({
  name: 'delete-cache',
  displayName: 'Delete Cache',
  description: "Delete and recreate the cache directory.",
  auth: tautulliAuth,
  props: {}, // Add input props here if needed
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_cache', {});
    return response;
  },
});
