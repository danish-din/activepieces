import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const terminateSession = createAction({
  name: 'terminate_session',
  displayName: 'Terminate Session',
  description: 'Stop a streaming session.',
  auth: tautulliAuth,
  props: {
    sessionKey: Property.Number({
      displayName: 'Session Key',
      required: false,
      description: 'The session key of the session to terminate.',
    }),
    sessionId: Property.ShortText({
      displayName: 'Session ID',
      required: false,
      description: 'The session ID of the session to terminate.',
    }),
    message: Property.ShortText({
      displayName: 'Message',
      required: false,
      description: 'A custom message to send to the client.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    await client.call('terminate_session', {
      session_key: propsValue.sessionKey !== undefined ? String(propsValue.sessionKey) : '',
      session_id: propsValue.sessionId ?? '',
      message: propsValue.message ?? '',
    });
  },
});