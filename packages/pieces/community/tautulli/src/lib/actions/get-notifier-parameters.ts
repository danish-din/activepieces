import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getNotifierParameters = createAction({
  name: 'get_notifier_parameters',
  displayName: 'Get Notifier Parameters',
  description: 'Get the list of available notification parameters.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_notifier_parameters', {});
    return response;
  },
});