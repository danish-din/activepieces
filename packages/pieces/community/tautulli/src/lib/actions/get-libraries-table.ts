import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getLibrariesTable = createAction({
  name: 'get_libraries_table',
  displayName: 'Get Libraries Table',
  description: 'Get the data on the Tautulli libraries table.',
  auth: tautulliAuth,
  props: {
    grouping: Property.Number({
      displayName: 'Grouping',
      required: false,
      description: 'Set to 0 or 1 to indicate grouping.',
    }),
    orderColumn: Property.ShortText({
      displayName: 'Order Column',
      required: false,
      description: 'Column to order by (e.g., "library_thumb", "section_name", "section_type").',
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
      description: 'A string to search for (e.g., "Movies").',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_libraries_table', {
      grouping: propsValue.grouping !== undefined ? String(propsValue.grouping) : '',
      order_column: propsValue.orderColumn ?? '',
      order_dir: propsValue.orderDir ?? 'asc',
      start: String(propsValue.start ?? 0),
      length: String(propsValue.length ?? 25),
      search: propsValue.search ?? '',
    });
    return response;
  },
});