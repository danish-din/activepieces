import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getChildrenMetadata = createAction({
  name: 'get_children_metadata',
  displayName: 'Get Children Metadata',
  description: 'Get the metadata for the children of a media item.',
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
      description: 'The media type of the item.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_children_metadata', {
      rating_key: propsValue.ratingKey,
      media_type: propsValue.mediaType,
    });
    return response;
  },
});