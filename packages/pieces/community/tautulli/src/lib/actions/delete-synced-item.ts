import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_synced_item = createAction({
  name: 'delete-synced-item',
  displayName: 'Delete Synced Item',
  description: 'Delete a synced item from a device.',
  auth: tautulliAuth,
  props: {
    client_id: Property.ShortText({
      displayName: 'Client ID',
      description: 'The client ID of the device to delete from.',
      required: true,
    }),
    sync_id: Property.ShortText({
      displayName: 'Sync ID',
      description: 'The sync ID of the synced item.',
      required: true,
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_synced_item', {
      client_id: String(propsValue.client_id),
      sync_id: String(propsValue.sync_id),
    });
    return response;
  },
});
