import { createTrigger, Property, TriggerStrategy } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { TautulliAuthValue } from '../common/types';

export const bandwidthSpikeDetected = createTrigger({
  name: 'bandwidth-spike-detected',
  displayName: 'Bandwidth Spike Detected',
  description: 'Triggers when LAN or WAN bandwidth usage exceeds a set threshold.',
  auth: tautulliAuth,
  type: TriggerStrategy.POLLING,
  props: {
    thresholdMbps: Property.Number({
      displayName: 'Bandwidth Threshold (Mbps)',
      description: 'Trigger when usage exceeds this number in Mbps.',
      required: true,
    }),
    interface: Property.StaticDropdown({
      displayName: 'Network Interface',
      description: 'Which interface to monitor',
      required: true,
      options: {
        disabled: false,
        options: [
          { label: 'LAN', value: 'lan_bandwidth' },
          { label: 'WAN', value: 'wan_bandwidth' },
        ],
      },
    }),
  },
  sampleData: {
    wan_bandwidth: 22.3,
    lan_bandwidth: 45.6,
    total_bandwidth: 67.9,
    now_playing: 3,
  },

  async onEnable() {
    // No-op
  },

  async onDisable() {
    // No-op
  },

  async run({ auth, propsValue }) {
    const client = makeClient(auth as TautulliAuthValue);
    const res = await client.call('get_activity');
    const stats = res.response?.data?.server?.stream_count || {};

    const bwStats = res.response?.data?.server || {};
    const currentUsage = bwStats[propsValue.interface];

    if (typeof currentUsage !== 'number') return [];

    const currentMbps = currentUsage / 1000 / 1000 * 8; // convert bytes/sec to Mbps

    if (currentMbps > propsValue.thresholdMbps) {
      return [{
        triggered_at: new Date().toISOString(),
        bandwidth_mbps: currentMbps,
        stream_count: stats,
      }];
    }

    return [];
  },

  async test({ auth }) {
    const client = makeClient(auth as TautulliAuthValue);
    const res = await client.call('get_activity');
    return [res.response?.data?.server];
  },
});
