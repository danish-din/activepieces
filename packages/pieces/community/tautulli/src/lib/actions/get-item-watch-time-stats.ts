import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getItemWatchTimeStats = createAction({
  name: 'get_item_watch_time_stats',
  displayName: 'Get Item Watch Time Stats',
  description: 'Get the watch time stats for the media item.',
  auth: tautulliAuth,
  props: {
    ratingKey: Property.ShortText({
      displayName: 'Rating Key',
      required: true,
      description: 'The rating key of the item.',
    }),
    mediaType: Property.ShortText({
      displayName: 'Media Type',
      required: false,
      description: 'The media type of the item (only required for a collection).',
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
    const response = await client.call('get_item_watch_time_stats', {
      rating_key: propsValue.ratingKey,
      media_type: propsValue.mediaType ?? '',
      grouping: propsValue.grouping !== undefined ? String(propsValue.grouping) : '',
      query_days: propsValue.queryDays ?? '',
    });
    return response;
  },
});