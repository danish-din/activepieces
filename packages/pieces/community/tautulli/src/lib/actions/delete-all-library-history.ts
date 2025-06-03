import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_all_library_history = createAction({
  name: 'delete-all-library-history',
  displayName: 'Delete All Library History',
  description: 'Delete all Tautulli history for a specific library.',
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
      displayName: 'Row IDs (optional)',
      description: 'Comma-separated row IDs to delete (e.g. "2,3,8"). Leave blank to delete all.',
      required: false,
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_all_library_history', {
      server_id: propsValue.server_id,
      section_id: propsValue.section_id,
      ...(propsValue.row_ids ? { row_ids: propsValue.row_ids } : {}),
    });
    return response;
  },
});
