import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getPlaylistsTable = createAction({
  name: 'get_playlists_table',
  displayName: 'Get Playlists Table',
  description: 'Get the data on the Tautulli playlists tables.',
  auth: tautulliAuth,
  props: {
    sectionId: Property.ShortText({
      displayName: 'Section ID',
      required: false,
      description: 'The section ID of the Plex library.',
    }),
    userId: Property.ShortText({
      displayName: 'User ID',
      required: false,
      description: 'The user ID of the Plex user.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_playlists_table', {
      section_id: propsValue.sectionId ?? '',
      user_id: propsValue.userId ?? '',
    });
    return response;
  },
});