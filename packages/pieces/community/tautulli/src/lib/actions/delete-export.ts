import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_export = createAction({
  name: 'delete-export',
  displayName: 'Delete Export',
  description: 'Delete exports from Tautulli.',
  auth: tautulliAuth,
  props: {
    export_id: Property.Number({
      displayName: 'Export ID',
      description: 'The row ID of the exported file to delete.',
      required: true,
    }),
    delete_all: Property.Checkbox({
      displayName: 'Delete All',
      description: "Set to true to delete all exported files.",
      required: false,
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_export', {
      export_id: String(propsValue.export_id),
      delete_all: String(propsValue.delete_all ?? false),
    });
    return response;
  },
});
