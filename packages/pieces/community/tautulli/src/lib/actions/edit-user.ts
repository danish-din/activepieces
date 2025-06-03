import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const editUser = createAction({
  name: 'edit_user',
  displayName: 'Edit User',
  description: 'Update a user on Tautulli.',
  auth: tautulliAuth,
  props: {
    userId: Property.ShortText({
      displayName: 'User ID',
      required: true,
      description: 'The ID of the Plex user.',
    }),
    friendlyName: Property.ShortText({
      displayName: 'Friendly Name',
      required: true,
      description: 'The friendly name of the user.',
    }),
    customThumb: Property.ShortText({
      displayName: 'Custom Thumbnail URL',
      required: true,
      description: 'The URL for the custom user thumbnail.',
    }),
    keepHistory: Property.Number({
      displayName: 'Keep History',
      required: true,
      description: 'Set to 0 or 1 to indicate whether to keep history.',
    }),
    allowGuest: Property.Number({
      displayName: 'Allow Guest',
      required: true,
      description: 'Set to 0 or 1 to indicate whether to allow guest access.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    await client.call('edit_user', {
      user_id: propsValue.userId,
      friendly_name: propsValue.friendlyName,
      custom_thumb: propsValue.customThumb,
      keep_history: String(propsValue.keepHistory),
      allow_guest: String(propsValue.allowGuest),
    });
    return { success: true };
  },
});