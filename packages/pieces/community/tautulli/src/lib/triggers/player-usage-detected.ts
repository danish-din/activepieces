import { createTrigger, TriggerStrategy, PiecePropValueSchema } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';

export const playerUsageDetected = createTrigger({
  name: 'player_usage_detected',
  displayName: 'Player Usage Detected',
  description: 'Trigger based on player usage events.',
  type: TriggerStrategy.POLLING,
  auth: tautulliAuth,
  props: {},

  async onEnable({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
    // You can initialise any tracking here if needed
    return;
  },

  async onDisable({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
    // Cleanup if needed
    return;
  },

  async run({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
    const client = makeClient(auth);
    const response = await client.call('get_user_player_stats', {});

    const entries = response?.response?.data;
    if (!Array.isArray(entries)) return [];

    return entries.map((entry: { user_id: number; player: string }) => ({
      id: `${entry.user_id}-${entry.player}`,
      data: entry,
    }));
  },

  async sampleData({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
    const client = makeClient(auth);
    const response = await client.call('get_user_player_stats', {});
    return response?.response?.data?.[0] || {};
  },
});
