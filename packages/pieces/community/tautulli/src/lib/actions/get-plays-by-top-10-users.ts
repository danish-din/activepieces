import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getPlaysByTop10Users = createAction({
  name: 'get_plays_by_top_10_users',
  displayName: 'Get Plays by Top 10 Users',
  description: 'Get graph data by top 10 users.',
  auth: tautulliAuth,
  props: {
    timeRange: Property.ShortText({
      displayName: 'Time Range',
      required: false,
      description: 'The number of days of data to return.',
    }),
    yAxis: Property.ShortText({
      displayName: 'Y-Axis',
      required: false,
      description: 'Specify "plays" or "duration".',
    }),
    userId: Property.ShortText({
      displayName: 'User ID',
      required: false,
      description: 'Comma-separated list of user IDs to filter the data.',
    }),
    grouping: Property.Number({
      displayName: 'Grouping',
      required: false,
      description: 'Set to 0 or 1 to indicate grouping.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_plays_by_top_10_users', {
      time_range: propsValue.timeRange ?? '',
      y_axis: propsValue.yAxis ?? '',
      user_id: propsValue.userId ?? '',
      grouping: propsValue.grouping !== undefined ? String(propsValue.grouping) : '',
    });
    return response;
  },
});