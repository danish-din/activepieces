import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getLibraryNames = createAction({
  name: 'get_library_names',
  displayName: 'Get Library Names',
  description: 'Get a list of library sections and IDs on the PMS.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_library_names', {});
    return response;
  },
});