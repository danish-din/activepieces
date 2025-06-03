import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getOldRatingKeys = createAction({
  name: 'get_old_rating_keys',
  displayName: 'Get Old Rating Keys',
  description: 'Get a list of old rating keys from the Tautulli database for all of the item\'s parent/children.',
  auth: tautulliAuth,
  props: {
    ratingKey: Property.ShortText({
      displayName: 'Rating Key',
      required: true,
      description: 'The rating key of the item.',
    }),
    mediaType: Property.ShortText({
      displayName: 'Media Type',
      required: true,
      description: 'The media type of the item (e.g., "movie", "show", "season").',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_old_rating_keys', {
      rating_key: propsValue.ratingKey,
      media_type: propsValue.mediaType,
    });
    return response;
  },
});