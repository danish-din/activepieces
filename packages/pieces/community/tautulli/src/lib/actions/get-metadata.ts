import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getMetadata = createAction({
  name: 'get_metadata',
  displayName: 'Get Metadata',
  description: 'Download an exported metadata file.',
  auth: tautulliAuth,
  props: {
    exportId: Property.Number({
      displayName: 'Export ID',
      required: true,
      description: 'The row ID of the exported file to download.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('download_export', { export_id: String(propsValue.exportId) });
    return response;
  },
});
