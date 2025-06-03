import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_history = createAction({
  name: 'delete-history',
  displayName: 'Delete History',
  description: 'Delete history rows from Tautulli.',
  auth: tautulliAuth,
  props: {
    row_ids: Property.ShortText({
      displayName: 'Row IDs',
      description: 'Comma-separated row IDs to delete, e.g. "65,110,2,3645".',
      required: true,
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_history', {
      row_ids: propsValue.row_ids,
    });
    return response;
  },
});

