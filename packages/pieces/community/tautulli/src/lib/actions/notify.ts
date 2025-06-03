import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const notify = createAction({
  name: 'notify',
  displayName: 'Send Notification',
  description: 'Send a notification using Tautulli.',
  auth: tautulliAuth,
  props: {
    notifierId: Property.Number({
      displayName: 'Notifier ID',
      required: true,
      description: 'The ID number of the notification agent.',
    }),
    subject: Property.ShortText({
      displayName: 'Subject',
      required: true,
      description: 'The subject of the message.',
    }),
    body: Property.ShortText({
      displayName: 'Body',
      required: true,
      description: 'The body of the message.',
    }),
    headers: Property.ShortText({
      displayName: 'Headers',
      required: false,
      description: 'The JSON headers for webhook notifications.',
    }),
    scriptArgs: Property.ShortText({
      displayName: 'Script Arguments',
      required: false,
      description: 'The arguments for script notifications.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('notify', {
      notifier_id: String(propsValue.notifierId),
      subject: propsValue.subject,
      body: propsValue.body,
      headers: propsValue.headers ?? '',
      script_args: propsValue.scriptArgs ?? '',
    });
    return response;
  },
});