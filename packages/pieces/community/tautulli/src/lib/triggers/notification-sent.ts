import { createTrigger, TriggerStrategy, PiecePropValueSchema } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';

export const notificationSent = createTrigger({
  name: 'notification_sent',
  displayName: 'Notification Sent',
  description: 'Trigger when a new notification is sent.',
  type: TriggerStrategy.POLLING,
  auth: tautulliAuth,
  props: {},

  async onEnable({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
    // Optional: store initial state if needed
    return;
  },

  async onDisable({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
    // Optional: cleanup
    return;
  },

  async run({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
    const client = makeClient(auth);
    const response = await client.call('get_notification_log', {});
    const entries = response?.response?.data;

    if (!Array.isArray(entries)) return [];

    return entries.map((entry: { row_id: number }) => ({
      id: String(entry.row_id),
      data: entry,
    }));
  },

  async sampleData({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
    const client = makeClient(auth);
    const response = await client.call('get_notification_log', {});
    return response?.response?.data?.[0] || {};
  },
});
