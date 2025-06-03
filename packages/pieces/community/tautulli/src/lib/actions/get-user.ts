import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getUser = createAction({
  name: 'get_user',
  displayName: 'Get User',
  description: 'Retrieve details of a specific Plex user.',
  auth: tautulliAuth,
  props: {
    userId: Property.ShortText({
      displayName: 'User ID',
      required: true,
      description: 'The ID of the Plex user.',
    }),
    includeLastSeen: Property.Checkbox({
      displayName: 'Include Last Seen',
      required: false,
      description: 'Set to true to include the last_seen value for the user.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_user', {
      user_id: propsValue.userId,
      include_last_seen: String(propsValue.includeLastSeen ?? false),
    });
    return response;
  },
});