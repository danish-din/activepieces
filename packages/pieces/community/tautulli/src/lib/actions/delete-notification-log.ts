import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_notification_log = createAction({
  name: 'delete-notification-log',
  displayName: 'Delete Notification Log',
  description: 'Delete the Tautulli notification logs.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_notification_log', {});
    return response;
  },
});

