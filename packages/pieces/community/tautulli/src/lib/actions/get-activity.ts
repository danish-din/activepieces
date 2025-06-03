import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common/client';
import { TautulliAuthValue } from '../common/types';

export const getActivity = createAction({
  name: 'get-activity',
  displayName: 'Get Activity',
  description: 'Get the current activity on the PMS.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as TautulliAuthValue);
    const response = await client.call('get_activity');
    return response;
  },
});