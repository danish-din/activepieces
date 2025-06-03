import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const undeleteUser = createAction({
  name: 'undelete_user',
  displayName: 'Undelete User',
  description: 'Restore a deleted user to Tautulli.',
  auth: tautulliAuth,
  props: {
    userId: Property.ShortText({
      displayName: 'User ID',
      required: true,
      description: 'The ID of the Plex user.',
    }),
    username: Property.ShortText({
      displayName: 'Username',
      required: true,
      description: 'The username of the Plex user.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    await client.call('undelete_user', {
      user_id: propsValue.userId,
      username: propsValue.username,
    });
  },
});