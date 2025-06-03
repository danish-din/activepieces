import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getLibraryUserStats = createAction({
  name: 'get_library_user_stats',
  displayName: 'Get Library User Stats',
  description: 'Get a library\'s user statistics.',
  auth: tautulliAuth,
  props: {
    sectionId: Property.ShortText({
      displayName: 'Section ID',
      required: true,
      description: 'The ID of the Plex library section.',
    }),
    grouping: Property.Number({
      displayName: 'Grouping',
      required: false,
      description: 'Set to 0 or 1 to indicate grouping.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_library_user_stats', {
      section_id: propsValue.sectionId,
      grouping: propsValue.grouping !== undefined ? String(propsValue.grouping) : '',
    });
    return response;
  },
});