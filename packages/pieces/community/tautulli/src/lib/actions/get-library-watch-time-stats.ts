import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getLibraryWatchTimeStats = createAction({
  name: 'get_library_watch_time_stats',
  displayName: 'Get Library Watch Time Stats',
  description: 'Get a library\'s watch time statistics.',
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
    queryDays: Property.ShortText({
      displayName: 'Query Days',
      required: false,
      description: 'Comma-separated days (e.g., "1,7,30,0").',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_library_watch_time_stats', {
      section_id: propsValue.sectionId,
      grouping: propsValue.grouping !== undefined ? String(propsValue.grouping) : '',
      query_days: propsValue.queryDays ?? '',
    });
    return response;
  },
});