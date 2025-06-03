import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const notify = createAction({
  name: 'notify',
  displayName: 'Send Notification',
  description: 'Send a custom notification using a configured notifier in Tautulli.',
  auth: tautulliAuth,
  props: {
    notifierId: Property.Number({
      displayName: 'Notifier ID',
      required: true,
      description: 'The ID of the configured notifier in Tautulli.',
    }),
    subject: Property.ShortText({
      displayName: 'Subject',
      required: true,
      description: 'The subject of the notification.',
    }),
    body: Property.LongText({
      displayName: 'Body',
      required: true,
      description: 'The body content of the notification.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('notify', {
      notifier_id: propsValue.notifierId.toString(),
      subject: propsValue.subject,
      body: propsValue.body,
    });
    return response;
  },
});
