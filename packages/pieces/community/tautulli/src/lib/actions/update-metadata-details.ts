import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const updateMetadataDetails = createAction({
  name: 'update_metadata_details',
  displayName: 'Update Metadata Details',
  description: 'Update the metadata in the Tautulli database by matching rating keys.',
  auth: tautulliAuth,
  props: {
    oldRatingKey: Property.ShortText({
      displayName: 'Old Rating Key',
      required: true,
      description: 'The old rating key of the media item.',
    }),
    newRatingKey: Property.ShortText({
      displayName: 'New Rating Key',
      required: true,
      description: 'The new rating key of the media item.',
    }),
    mediaType: Property.ShortText({
      displayName: 'Media Type',
      required: true,
      description: 'The type of media (e.g., "movie", "show", "season", "episode", "artist", "album", "track").',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    await client.call('update_metadata_details', {
      old_rating_key: propsValue.oldRatingKey,
      new_rating_key: propsValue.newRatingKey,
      media_type: propsValue.mediaType,
    });
  },
});