import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const docs = createAction({
  name: 'docs',
  displayName: 'Docs',
  description: 'Return the API docs as a dict where commands are keys and docstrings are values.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('docs', {});
    return response;
  },
});
