import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_newsletter = createAction({
  name: 'delete-newsletter',
  displayName: 'Delete Newsletter',
  description: 'Remove a newsletter from the database.',
  auth: tautulliAuth,
  props: {
    newsletter_id: Property.Number({
      displayName: 'Newsletter ID',
      description: 'The newsletter to delete.',
      required: true,
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_newsletter', {
      newsletter_id: String(propsValue['newsletter_id']),
    });
    return response;
  },
});
