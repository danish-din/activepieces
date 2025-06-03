import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { TautulliAuthValue } from '../common/types';

export const userLoginDetected = createTrigger({
  name: 'user-login-detected',
  displayName: 'User Login Detected',
  description: 'Triggers when a user logs into Plex.',
  auth: tautulliAuth,
  type: TriggerStrategy.POLLING,
  props: {},
  sampleData: {
    user: 'johndoe',
    ip_address: '192.168.1.42',
    platform: 'Android',
    player: 'Plex App',
    product: 'Plex',
    time: '2024-05-20 09:43:00',
  },

  async onEnable() {
    // No-op
  },

  async onDisable() {
    // No-op
  },

  async run({ auth, store }) {
    const client = makeClient(auth as TautulliAuthValue);
    const res = await client.call('get_user_logins');
    const logins = res.response.data || [];

    const lastTimestamp = await store.get<string>('last_login_ts') ?? '0';
    const newLogins = logins.filter((login: any) => login.time > lastTimestamp);

    if (newLogins.length > 0) {
      const latest = newLogins.reduce((max: string, curr: any) =>
        curr.time > max ? curr.time : max, lastTimestamp);
      await store.put('last_login_ts', latest);
    }

    return newLogins;
  },

  async test({ auth }) {
    const client = makeClient(auth as TautulliAuthValue);
    const res = await client.call('get_user_logins');
    return res.response.data.slice(0, 3);
  },
});
