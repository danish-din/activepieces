import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getItemUserStats = createAction({
  name: 'get_item_user_stats',
  displayName: 'Get Item User Stats',
  description: 'Get the user stats for the media item.',
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
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_item_user_stats', {
      rating_key: propsValue.ratingKey,
      media_type: propsValue.mediaType ?? '',
      grouping: propsValue.grouping !== undefined ? String(propsValue.grouping) : '',
    });
    return response;
  },
});