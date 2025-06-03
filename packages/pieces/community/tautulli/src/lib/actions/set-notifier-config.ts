import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const setNotifierConfig = createAction({
  name: 'set_notifier_config',
  displayName: 'Set Notifier Config',
  description: 'Configure an existing notification agent.',
  auth: tautulliAuth,
  props: {
    notifierId: Property.Number({
      displayName: 'Notifier ID',
      required: true,
      description: 'The notifier config to update.',
    }),
    agentId: Property.Number({
      displayName: 'Agent ID',
      required: true,
      description: 'The agent of the notifier.',
    }),
    configOptions: Property.Json({
      displayName: 'Config Options',
      required: false,
      description: 'Pass all the config options for the agent with the agent prefix (e.g., Telegram options).',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    await client.call('set_notifier_config', {
      notifier_id: String(propsValue.notifierId),
      agent_id: String(propsValue.agentId),
      ...propsValue.configOptions,
    });
  },
});