import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_image_cache = createAction({
  name: 'delete-image-cache',
  displayName: 'Delete Image Cache',
  description: 'Delete and recreate the image cache directory.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_image_cache', {});
    return response;
  },
});
