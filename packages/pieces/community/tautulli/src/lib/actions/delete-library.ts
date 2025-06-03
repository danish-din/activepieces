import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_library = createAction({
  name: 'delete-library',
  displayName: 'Delete Library',
  description: 'Delete a library section from Tautulli. Also erases all history for the library.',
  auth: tautulliAuth,
  props: {
    server_id: Property.ShortText({
      displayName: 'Server ID',
      description: 'The Plex server identifier of the library section.',
      required: true,
    }),
    section_id: Property.ShortText({
      displayName: 'Section ID',
      description: 'The ID of the Plex library section.',
      required: true,
    }),
    row_ids: Property.ShortText({
      displayName: 'Row IDs',
      description: 'Comma-separated row IDs to delete, e.g. "2,3,8".',
      required: false,
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_library', {
      server_id: String(propsValue.server_id),
      section_id: String(propsValue.section_id),
      row_ids: String(propsValue.row_ids),
    });
    return response;
  },
});
