import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getDateFormats = createAction({
  name: 'get_date_formats',
  displayName: 'Get Date Formats',
  description: 'Get the date and time formats used by Tautulli.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_date_formats', {});
    return response;
  },
});