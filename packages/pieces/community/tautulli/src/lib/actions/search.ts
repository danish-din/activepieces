import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const search = createAction({
  name: 'search',
  displayName: 'Search PMS',
  description: 'Get search results from the PMS.',
  auth: tautulliAuth,
  props: {
    query: Property.ShortText({
      displayName: 'Query',
      required: true,
      description: 'The query string to search for.',
    }),
    limit: Property.Number({
      displayName: 'Limit',
      required: false,
      description: 'The maximum number of items to return per media type.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('search', {
      query: propsValue.query,
      limit: propsValue.limit !== undefined ? String(propsValue.limit) : '',
    });
    return response;
  },
});