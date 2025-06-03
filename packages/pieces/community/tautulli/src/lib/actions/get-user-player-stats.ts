import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getUserPlayerStats = createAction({
  name: 'get_user_player_stats',
  displayName: 'Get User Player Stats',
  description: 'Get a user\'s player statistics.',
  auth: tautulliAuth,
  props: {
    userId: Property.ShortText({
      displayName: 'User ID',
      required: true,
      description: 'The ID of the Plex user.',
    }),
    grouping: Property.Number({
      displayName: 'Grouping',
      required: false,
      description: 'Set to 0 or 1 to indicate grouping.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_user_player_stats', {
      user_id: propsValue.userId,
      grouping: propsValue.grouping !== undefined ? String(propsValue.grouping) : '',
    });
    return response;
  },
});