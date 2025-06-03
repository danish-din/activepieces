import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getStreamData = createAction({
  name: 'get-stream-data',
  displayName: 'Get Stream Data',
  description: 'Retrieve metrics about streams like bitrate, resolution, platform, and more.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_stream_data');
    return response;
  },
});
