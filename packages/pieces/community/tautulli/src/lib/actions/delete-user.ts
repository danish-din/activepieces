import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_user = createAction({
  name: 'delete-user',
  displayName: 'Delete User',
  description: 'Delete a user from Tautulli. Also erases all history for the user.',
  auth: tautulliAuth,
  props: {
    user_id: Property.ShortText({
      displayName: 'User ID',
      description: 'The ID of the Plex user.',
      required: true,
    }),
    row_ids: Property.ShortText({
      displayName: 'Row IDs',
      description: 'Comma-separated row IDs to delete, e.g. "2,3,8".',
      required: false,
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_user', {
      user_id: String(propsValue['user_id']),
      row_ids: String(propsValue['row_ids']),
    });
    return response;
  },
});
