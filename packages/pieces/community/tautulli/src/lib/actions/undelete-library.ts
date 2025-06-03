import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const undeleteLibrary = createAction({
  name: 'undelete_library',
  displayName: 'Undelete Library',
  description: 'Restore a deleted library section to Tautulli.',
  auth: tautulliAuth,
  props: {
    sectionId: Property.ShortText({
      displayName: 'Section ID',
      required: true,
      description: 'The ID of the Plex library section.',
    }),
    sectionName: Property.ShortText({
      displayName: 'Section Name',
      required: true,
      description: 'The name of the Plex library section.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    await client.call('undelete_library', {
      section_id: propsValue.sectionId,
      section_name: propsValue.sectionName,
    });
  },
});