import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getNotifiers = createAction({
  name: 'get_notifiers',
  displayName: 'Get Notifiers',
  description: 'Get a list of configured notifiers.',
  auth: tautulliAuth,
  props: {
    notifyAction: Property.ShortText({
      displayName: 'Notification Action',
      required: false,
      description: 'The notification action to filter out.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_notifiers', {
      notify_action: propsValue.notifyAction ?? '',
    });
    return response;
  },
});