import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_newsletter_log = createAction({
  name: 'delete-newsletter-log',
  displayName: 'Delete Newsletter Log',
  description: 'Delete the Tautulli newsletter logs.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_newsletter_log', {});
    return response;
  },
});
