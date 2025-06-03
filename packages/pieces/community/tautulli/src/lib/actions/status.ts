import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const status = createAction({
  name: 'status',
  displayName: 'Get Tautulli Status',
  description: 'Get the current status of Tautulli.',
  auth: tautulliAuth,
  props: {
    check: Property.ShortText({
      displayName: 'Check',
      required: false,
      description: 'Specify "database" to check the database status.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('status', {
      check: propsValue.check ?? '',
    });
    return response;
  },
});