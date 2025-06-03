import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const docs_md = createAction({
  name: 'docs-md',
  displayName: 'Docs (Markdown)',
  description: 'Return the API docs formatted with markdown.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('docs_md', {});
    return response;
  },
});
