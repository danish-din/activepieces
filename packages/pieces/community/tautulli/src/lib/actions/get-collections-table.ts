import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getCollectionsTable = createAction({
  name: 'get_collections_table',
  displayName: 'Get Collections Table',
  description: 'Get the data on the Tautulli collections tables.',
  auth: tautulliAuth,
  props: {
    sectionId: Property.ShortText({
      displayName: 'Section ID',
      required: true,
      description: 'The ID of the Plex library section.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('get_collections_table', {
      section_id: propsValue.sectionId,
    });
    return response;
  },
});