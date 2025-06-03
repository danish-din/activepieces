import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getPmsUpdate = createAction({
  name: 'get_pms_update',
  displayName: 'Get PMS Update',
  description: 'Check for updates to the Plex Media Server.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_pms_update', {});
    return response;
  },
});