import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getNewsletterLog = createAction({
  name: 'get_newsletter_log',
  displayName: 'Get Newsletter Log',
  description: 'Get the data on the Tautulli newsletter logs table.',
  auth: tautulliAuth,
  props: {
    orderColumn: Property.ShortText({
      displayName: 'Order Column',
      required: false,
      description: 'Column to order by (e.g., "timestamp", "newsletter_id").',
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
      description: 'A string to search for (e.g., "Telegram").',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_newsletter_log', {
      order_column: propsValue.orderColumn ?? '',
      order_dir: propsValue.orderDir ?? 'asc',
      start: String(propsValue.start ?? 0),
      length: String(propsValue.length ?? 25),
      search: propsValue.search ?? '',
    });
    return response;
  },
});