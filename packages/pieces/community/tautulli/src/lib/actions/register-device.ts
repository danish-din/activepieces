import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const registerDevice = createAction({
  name: 'register_device',
  displayName: 'Register Device',
  description: 'Registers the Tautulli Remote App.',
  auth: tautulliAuth,
  props: {
    deviceId: Property.ShortText({
      displayName: 'Device ID',
      required: true,
      description: 'The unique device identifier for the mobile device.',
    }),
    deviceName: Property.ShortText({
      displayName: 'Device Name',
      required: true,
      description: 'The device name of the mobile device.',
    }),
    platform: Property.ShortText({
      displayName: 'Platform',
      required: false,
      description: 'The platform of the mobile device.',
    }),
    version: Property.ShortText({
      displayName: 'Version',
      required: false,
      description: 'The version of the app.',
    }),
    friendlyName: Property.ShortText({
      displayName: 'Friendly Name',
      required: false,
      description: 'A friendly name to identify the mobile device.',
    }),
    onesignalId: Property.ShortText({
      displayName: 'OneSignal ID',
      required: false,
      description: 'The OneSignal ID for the mobile device.',
    }),
    minVersion: Property.ShortText({
      displayName: 'Minimum Version',
      required: false,
      description: 'The minimum Tautulli version supported by the mobile device (e.g., v2.5.6).',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('register_device', {
      device_id: propsValue.deviceId,
      device_name: propsValue.deviceName,
      platform: propsValue.platform ?? '',
      version: propsValue.version ?? '',
      friendly_name: propsValue.friendlyName ?? '',
      onesignal_id: propsValue.onesignalId ?? '',
      min_version: propsValue.minVersion ?? '',
    });
    return response;
  },
});