import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getConcurrentStreamsByStreamType = createAction({
  name: 'get_concurrent_streams_by_stream_type',
  displayName: 'Get Concurrent Streams by Stream Type',
  description: 'Get graph data for concurrent streams by stream type by date.',
  auth: tautulliAuth,
  props: {
    timeRange: Property.ShortText({
      displayName: 'Time Range',
      required: false,
      description: 'The number of days of data to return.',
    }),
    userId: Property.ShortText({
      displayName: 'User ID',
      required: false,
      description: 'Comma-separated list of user IDs to filter the data.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_concurrent_streams_by_stream_type', {
      time_range: propsValue.timeRange ?? '',
      user_id: propsValue.userId ?? '',
    });
    return response;
  },
});