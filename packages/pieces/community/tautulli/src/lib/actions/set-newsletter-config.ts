import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const setNewsletterConfig = createAction({
  name: 'set_newsletter_config',
  displayName: 'Set Newsletter Config',
  description: 'Configure an existing newsletter agent.',
  auth: tautulliAuth,
  props: {
    newsletterId: Property.Number({
      displayName: 'Newsletter ID',
      required: true,
      description: 'The newsletter config to update.',
    }),
    agentId: Property.Number({
      displayName: 'Agent ID',
      required: true,
      description: 'The newsletter type of the newsletter.',
    }),
    configOptions: Property.Json({
      displayName: 'Config Options',
      required: false,
      description: 'Pass all the config options for the agent with the "newsletter_config_" and "newsletter_email_" prefix.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    await client.call('set_newsletter_config', {
      newsletter_id: String(propsValue.newsletterId),
      agent_id: String(propsValue.agentId),
      ...propsValue.configOptions,
    });
  },
});