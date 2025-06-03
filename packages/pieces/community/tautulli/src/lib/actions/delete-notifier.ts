import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_notifier = createAction({
  name: 'delete-notifier',
  displayName: 'Delete Notifier',
  description: 'Remove a notifier from the database.',
  auth: tautulliAuth,
  props: {
    notifier_id: Property.Number({
      displayName: 'Notifier ID',
      description: 'The notifier to delete.',
      required: true,
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_notifier', {
      notifier_id: String(propsValue['notifier_id']),
    });
    return response;
  },
});
