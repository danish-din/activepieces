import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getNotificationLog = createAction({
  name: 'get-notification-log',
  displayName: 'Get Notification Log',
  description: 'Retrieve log entries for all notifications sent. Optional filtering by user or event.',
  auth: tautulliAuth,
  props: {
    userId: Property.Number({
      displayName: 'User ID',
      required: false,
      description: 'Optional user ID to filter notification logs.',
    }),
    event: Property.ShortText({
      displayName: 'Event',
      required: false,
      description: 'Optional event name to filter logs.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_notification_log', {
      ...(propsValue.userId ? { user_id: propsValue.userId.toString() } : {}),
      ...(propsValue.event ? { event: propsValue.event } : {}),
    });
    return response;
  },
});

