import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getServerId = createAction({
  name: 'get_server_id',
  displayName: 'Get Server ID',
  description: 'Get the PMS server identifier.',
  auth: tautulliAuth,
  props: {
    hostname: Property.ShortText({
      displayName: 'Hostname',
      required: true,
      description: 'The hostname of the Plex Media Server (e.g., "localhost" or "192.160.0.10").',
    }),
    port: Property.Number({
      displayName: 'Port',
      required: true,
      description: 'The port of the Plex Media Server (e.g., 32400).',
    }),
    ssl: Property.Number({
      displayName: 'SSL',
      required: false,
      description: 'Set to 0 or 1 to indicate SSL usage.',
    }),
    remote: Property.Number({
      displayName: 'Remote',
      required: false,
      description: 'Set to 0 or 1 to indicate remote access.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_server_id', {
      hostname: propsValue.hostname,
      port: propsValue.port.toString(),
      ssl: (propsValue.ssl ?? 0).toString(),
      remote: (propsValue.remote ?? 0).toString(),
    });
    return response.identifier;
  },
});