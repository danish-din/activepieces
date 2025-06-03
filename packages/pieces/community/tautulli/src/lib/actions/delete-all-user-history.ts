import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_all_user_history = createAction({
  name: 'delete-all-user-history',
  displayName: 'Delete All User History',
  description: 'Delete all Tautulli history for a specific user.',
  auth: tautulliAuth,
  props: {
    user_id: Property.ShortText({
      displayName: 'User ID',
      description: 'The ID of the Plex user.',
      required: true,
    }),
    row_ids: Property.ShortText({
      displayName: 'Row IDs (Optional)',
      description: 'Comma-separated row IDs to delete, e.g. "2,3,8". Leave blank to delete all.',
      required: false,
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_all_user_history', {
      user_id: propsValue.user_id,
      ...(propsValue.row_ids ? { row_ids: propsValue.row_ids } : {}),
    });
    return response;
  },
});
