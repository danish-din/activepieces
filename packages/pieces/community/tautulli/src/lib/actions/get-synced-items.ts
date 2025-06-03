import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getSyncedItems = createAction({
  name: 'get_synced_items',
  displayName: 'Get Synced Items',
  description: 'Get a list of synced items on the PMS.',
  auth: tautulliAuth,
  props: {
    machineId: Property.ShortText({
      displayName: 'Machine ID',
      required: false,
      description: 'The PMS identifier.',
    }),
    userId: Property.ShortText({
      displayName: 'User ID',
      required: false,
      description: 'The ID of the Plex user.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_synced_items', {
      machine_id: propsValue.machineId ?? '',
      user_id: propsValue.userId ?? '',
    });
    return response;
  },
});