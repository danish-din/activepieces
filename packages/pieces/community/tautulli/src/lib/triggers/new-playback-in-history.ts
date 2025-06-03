import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { TautulliAuthValue } from '../common/types';

export const newPlaybackInHistory = createTrigger({
  name: 'new-playback-in-history',
  displayName: 'New Playback in History',
  description: 'Triggers when a new playback is completed in Tautulli.',
  auth: tautulliAuth,
  type: TriggerStrategy.POLLING,
  props: {},
  sampleData: {
    media_type: 'movie',
    title: 'Inception',
    user: 'john_doe',
    watched_status: 1,
    date: '2024-05-01 12:34:56',
  },

  async onEnable() {
    // no-op
  },

  async onDisable() {
    // no-op
  },

  async run({ auth, store }) {
    const client = makeClient(auth as TautulliAuthValue);

    const lastId = await store.get<number>('last_history_id') ?? 0;
    const res = await client.call('get_history');

    const allHistory = res.response.data.data || [];
    const newItems = allHistory.filter((entry: any) => entry.row_id > lastId);

    if (newItems.length > 0) {
      const maxId = Math.max(...newItems.map((item: any) => item.row_id));
      await store.put('last_history_id', maxId);
    }

    return newItems;
  },

  async test({ auth }) {
    const client = makeClient(auth as TautulliAuthValue);
    const res = await client.call('get_history');
    return res.response.data.data.slice(0, 3); // show sample data
  },
});
