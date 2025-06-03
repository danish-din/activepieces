import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const logoutUserSession = createAction({
  name: 'logout_user_session',
  displayName: 'Logout User Session',
  description: 'Logout Tautulli user sessions.',
  auth: tautulliAuth,
  props: {
    rowIds: Property.ShortText({
      displayName: 'Row IDs',
      required: true,
      description: 'Comma-separated row IDs to sign out (e.g., "2,3,8").',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    await client.call('logout_user_session', {
      row_ids: propsValue.rowIds,
    });
  },
});