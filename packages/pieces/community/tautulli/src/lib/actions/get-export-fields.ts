import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getExportFields = createAction({
  name: 'get_export_fields',
  displayName: 'Get Export Fields',
  description: 'Get a list of available custom export fields.',
  auth: tautulliAuth,
  props: {
    mediaType: Property.ShortText({
      displayName: 'Media Type',
      required: true,
      description: 'The media type of the fields to return.',
    }),
    subMediaType: Property.ShortText({
      displayName: 'Sub Media Type',
      required: false,
      description: 'The child media type for collections or playlists (e.g., movie, show, artist, album, photoalbum).',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_export_fields', {
      media_type: propsValue.mediaType,
      sub_media_type: propsValue.subMediaType ?? '',
    });
    return response;
  },
});