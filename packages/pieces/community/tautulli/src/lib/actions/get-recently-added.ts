import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getRecentlyAdded = createAction({
  name: 'get_recently_added',
  displayName: 'Get Recently Added',
  description: 'Get all items that were recently added to Plex.',
  auth: tautulliAuth,
  props: {
    count: Property.ShortText({
      displayName: 'Count',
      required: true,
      description: 'Number of items to return.',
    }),
    start: Property.ShortText({
      displayName: 'Start',
      required: false,
      description: 'The item number to start at.',
    }),
    mediaType: Property.ShortText({
      displayName: 'Media Type',
      required: false,
      description: 'The media type: movie, show, artist.',
    }),
    sectionId: Property.ShortText({
      displayName: 'Section ID',
      required: false,
      description: 'The ID of the Plex library section.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_recently_added', {
      count: propsValue.count,
      start: propsValue.start ?? '',
      media_type: propsValue.mediaType ?? '',
      section_id: propsValue.sectionId ?? '',
    });
    return response.recently_added;
  },
});