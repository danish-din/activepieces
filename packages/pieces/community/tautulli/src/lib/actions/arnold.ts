import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const arnold = createAction({
  name: 'arnold',
  displayName: 'arnold',
  description: "Get to the chopper!",
  auth: tautulliAuth,
  props: {}, // Add input props here if needed
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('arnold', {});
    return response;
  },
});
