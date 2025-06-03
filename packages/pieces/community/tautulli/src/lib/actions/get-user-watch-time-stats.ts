import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getUserWatchTimeStats = createAction({
  name: 'get_user_watch_time_stats',
  displayName: 'Get User Watch Time Stats',
  description: 'Get a user\'s watch time statistics.',
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
    queryDays: Property.ShortText({
      displayName: 'Query Days',
      required: false,
      description: 'Comma-separated days (e.g., "1,7,30,0").',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_user_watch_time_stats', {
      user_id: propsValue.userId,
      grouping: propsValue.grouping !== undefined ? String(propsValue.grouping) : '',
      query_days: propsValue.queryDays ?? '',
    });
    return response;
  },
});