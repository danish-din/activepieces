import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const setMobileDeviceConfig = createAction({
  name: 'set_mobile_device_config',
  displayName: 'Set Mobile Device Config',
  description: 'Configure an existing notification agent.',
  auth: tautulliAuth,
  props: {
    mobileDeviceId: Property.Number({
      displayName: 'Mobile Device ID',
      required: true,
      description: 'The mobile device config to update.',
    }),
    friendlyName: Property.ShortText({
      displayName: 'Friendly Name',
      required: false,
      description: 'A friendly name to identify the mobile device.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    await client.call('set_mobile_device_config', {
      mobile_device_id: propsValue.mobileDeviceId.toString(),
      friendly_name: propsValue.friendlyName ?? '',
    });
  },
});