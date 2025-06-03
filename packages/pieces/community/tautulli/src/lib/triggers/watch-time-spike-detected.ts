import { createTrigger, TriggerStrategy, PiecePropValueSchema } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';

export const watchTimeSpikeDetected = createTrigger({
  name: 'watch_time_spike_detected',
  displayName: 'Watch Time Spike Detected',
  description: 'Trigger if someone\'s watch time spikes.',
  type: TriggerStrategy.POLLING,
  auth: tautulliAuth,
  props: {},

  async onEnable({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
    // Could initialise store here for threshold tracking, if desired
    return;
  },

  async onDisable({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
    return;
  },

  async run({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
    const client = makeClient(auth);
    const response = await client.call('get_user_watch_time_stats', {});

    const entries = response?.response?.data;
    if (!Array.isArray(entries)) return [];

    return entries.map((entry: { user_id: number; total: number }) => ({
      id: `${entry.user_id}-${entry.total}`,
      data: entry,
    }));
  },

  async sampleData({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
    const client = makeClient(auth);
    const response = await client.call('get_user_watch_time_stats', {});
    return response?.response?.data?.[0] || {};
  },
});
