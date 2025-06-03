import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const editLibrary = createAction({
  name: 'edit_library',
  displayName: 'Edit Library',
  description: 'Update a library section on Tautulli.',
  auth: tautulliAuth,
  props: {
    sectionId: Property.ShortText({
      displayName: 'Library Section ID',
      required: true,
      description: 'The ID of the Plex library section.',
    }),
    customThumb: Property.ShortText({
      displayName: 'Custom Thumbnail URL',
      required: true,
      description: 'The URL for the custom library thumbnail.',
    }),
    customArt: Property.ShortText({
      displayName: 'Custom Background Art URL',
      required: true,
      description: 'The URL for the custom library background art.',
    }),
    keepHistory: Property.Number({
      displayName: 'Keep History',
      required: true,
      description: 'Set to 0 or 1 to indicate whether to keep history.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    await client.call('edit_library', {
      section_id: propsValue.sectionId,
      custom_thumb: propsValue.customThumb,
      custom_art: propsValue.customArt,
      keep_history: String(propsValue.keepHistory),
    });
    return { success: true };
  },
});