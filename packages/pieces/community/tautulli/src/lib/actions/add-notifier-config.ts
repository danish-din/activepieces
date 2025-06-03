import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const add_notifier_config = createAction({
  name: 'add-notifier-config',
  displayName: 'Add Notifier Config',
  description: 'Add a new notification agent.',
  auth: tautulliAuth,
  props: {
    agent_id: Property.Number({
      displayName: 'Agent ID',
      description: 'The notification agent to add.',
      required: true,
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('add_notifier_config', {
      agent_id: String(propsValue.agent_id),
    });
    return response;
  },
});
