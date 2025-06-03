import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getUserIps = createAction({
  name: 'get_user_ips',
  displayName: 'Get User IPs',
  description: 'Get the data on Tautulli users IP table.',
  auth: tautulliAuth,
  props: {
    userId: Property.ShortText({
      displayName: 'User ID',
      required: true,
      description: 'The ID of the Plex user.',
    }),
    orderColumn: Property.ShortText({
      displayName: 'Order Column',
      required: false,
      description: 'Column to order by (e.g., "last_seen", "ip_address").',
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
      description: 'A string to search for (e.g., "xxx.xxx.xxx.xxx").',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_user_ips', {
      user_id: propsValue.userId,
      order_column: propsValue.orderColumn ?? '',
      order_dir: propsValue.orderDir ?? 'asc',
      start: String(propsValue.start ?? 0),
      length: String(propsValue.length ?? 25),
      search: propsValue.search ?? '',
    });
    return response;
  },
});