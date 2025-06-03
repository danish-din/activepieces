import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const add_newsletter_config = createAction({
  name: 'add-newsletter-config',
  displayName: 'Add Newsletter Config',
  description: 'Add a new notification agent.',
  auth: tautulliAuth,
  props: {
    agent_id: Property.Number({
      displayName: 'Agent ID',
      description: 'The newsletter type to add.',
      required: true,
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('add_newsletter_config', {
      agent_id: String(propsValue.agent_id),
    });
    return response;
  },
});
