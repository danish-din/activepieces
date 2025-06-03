import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getNewsletterConfig = createAction({
  name: 'get_newsletter_config',
  displayName: 'Get Newsletter Config',
  description: 'Get the configuration for an existing notification agent.',
  auth: tautulliAuth,
  props: {
    newsletterId: Property.Number({
      displayName: 'Newsletter ID',
      required: true,
      description: 'The newsletter config to retrieve.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_newsletter_config', {
      newsletter_id: propsValue.newsletterId.toString(),
    });
    return response;
  },
});