import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getPlexLog = createAction({
  name: 'get_plex_log',
  displayName: 'Get Plex Log',
  description: 'Get the PMS logs.',
  auth: tautulliAuth,
  props: {
    window: Property.Number({
      displayName: 'Window',
      required: false,
      description: 'The number of tail lines to return.',
    }),
    logfile: Property.ShortText({
      displayName: 'Log File Name',
      required: false,
      description: 'The name of the Plex log file (e.g., "Plex Media Server", "Plex Media Scanner").',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_plex_log', {
      window: propsValue.window !== undefined ? String(propsValue.window) : '',
      logfile: propsValue.logfile ?? '',
    });
    return response;
  },
});