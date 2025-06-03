import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getLog = createAction({
  name: 'get_log',
  displayName: 'Get Log',
  description: 'Download the Tautulli log file.',
  auth: tautulliAuth,
  props: {
    logfile: Property.ShortText({
      displayName: 'Log File Name',
      required: false,
      description: 'The name of the Tautulli log file (e.g., "tautulli", "tautulli_api", "plex_websocket").',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('download_log', { logfile: String(propsValue.logfile) });
    return response;
  },
});