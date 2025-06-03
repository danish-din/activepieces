import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getExportsTable = createAction({
  name: 'get_exports_table',
  displayName: 'Get Exports Table',
  description: 'Get the data on the Tautulli export tables.',
  auth: tautulliAuth,
  props: {
    sectionId: Property.ShortText({
      displayName: 'Section ID',
      required: false,
      description: 'The ID of the Plex library section.',
    }),
    userId: Property.ShortText({
      displayName: 'User ID',
      required: false,
      description: 'The ID of the Plex user.',
    }),
    ratingKey: Property.ShortText({
      displayName: 'Rating Key',
      required: false,
      description: 'The rating key of the exported item.',
    }),
    orderColumn: Property.ShortText({
      displayName: 'Order Column',
      required: false,
      description: 'Column to order by (e.g., "added_at", "sort_title", "container").',
    }),
    orderDir: Property.ShortText({
      displayName: 'Order Direction',
      required: false,
      description: 'Order direction ("desc" or "asc").',
    }),
    start: Property.Number({
      displayName: 'Start Row',
      required: false,
      description: 'Row to start from (default is 0).',
    }),
    length: Property.Number({
      displayName: 'Number of Items',
      required: false,
      description: 'Number of items to return (default is 25).',
    }),
    search: Property.ShortText({
      displayName: 'Search Query',
      required: false,
      description: 'A string to search for (e.g., "Thrones").',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_exports_table', {
      section_id: propsValue.sectionId ?? '',
      user_id: propsValue.userId ?? '',
      rating_key: propsValue.ratingKey ?? '',
      order_column: propsValue.orderColumn ?? '',
      order_dir: propsValue.orderDir ?? 'asc',
      start: String(propsValue.start ?? 0),
      length: String(propsValue.length ?? 25),
      search: propsValue.search ?? '',
    });
    return response;
  },
});