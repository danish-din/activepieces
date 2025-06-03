import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { TautulliAuthValue } from '../common/types';

export const getUser = createAction({
  name: 'get-user',
  displayName: 'Get User Info',
  description: 'Retrieve details for a specific Plex user by user ID.',
  auth: tautulliAuth,
  props: {
    userId: Property.Number({
      displayName: 'User ID',
      description: 'The numeric user ID from Tautulli.',
      required: true,
    }),
  },
  async run({ propsValue, auth }) {
    const client = makeClient(auth as TautulliAuthValue);
    const response = await client.call('get_user', {
      user_id: propsValue.userId.toString(),
    });
    return response;
  },
});
