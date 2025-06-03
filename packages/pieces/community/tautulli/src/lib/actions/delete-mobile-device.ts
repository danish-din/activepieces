import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_mobile_device = createAction({
  name: 'delete-mobile-device',
  displayName: 'Delete Mobile Device',
  description: 'Remove a mobile device from the database.',
  auth: tautulliAuth,
  props: {
    mobile_device_id: Property.Number({
      displayName: 'Mobile Device ID',
      description: 'The database ID of the mobile device to delete.',
      required: false,
    }),
    device_id: Property.ShortText({
      displayName: 'Device ID',
      description: 'The unique identifier of the mobile device.',
      required: false,
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const params: Record<string, string> = {};

    if (propsValue['mobile_device_id'] !== undefined) {
      params['mobile_device_id'] = String(propsValue['mobile_device_id']);
    }

    if (propsValue['device_id'] !== undefined) {
      params['device_id'] = String(propsValue['device_id']);
    }

    const response = await client.call('delete_mobile_device', params);
    return response;
  },
});
