import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const notifyRecentlyAdded = createAction({
  name: 'notify-recently-added',
  displayName: 'Notify Recently Added',
  description: 'Send a manual notification containing recently added media items.',
  auth: tautulliAuth,
  props: {
    newsletterId: Property.Number({
      displayName: 'Newsletter ID',
      required: true,
      description: 'The ID of the newsletter configuration to use.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('notify_recently_added', {
      newsletter_id: propsValue.newsletterId.toString(),
    });
    return response;
  },
});
