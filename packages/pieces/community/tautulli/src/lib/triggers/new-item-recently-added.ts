import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { TautulliAuthValue } from '../common/types';

export const newItemRecentlyAdded = createTrigger({
  name: 'new-item-recently-added',
  displayName: 'New Item Recently Added',
  description: 'Triggers when a new media item is added to Plex.',
  auth: tautulliAuth,
  type: TriggerStrategy.POLLING,
  props: {},
  sampleData: {
    title: 'The Batman',
    media_type: 'movie',
    added_at: '2024-05-15 18:22:00',
    rating_key: '13579',
  },

  async onEnable() {
    // no setup required
  },

  async onDisable() {
    // no teardown required
  },

  async run({ auth, store }) {
    const client = makeClient(auth as TautulliAuthValue);
    const res = await client.call('get_recently_added');

    const recentlyAdded = res.response.data || [];
    const lastSeenKey = await store.get<number>('last_rating_key') ?? 0;

    const newItems = recentlyAdded.filter((item: any) => item.rating_key > lastSeenKey);

    if (newItems.length > 0) {
      const maxKey = Math.max(...newItems.map((item: any) => Number(item.rating_key)));
      await store.put('last_rating_key', maxKey);
    }

    return newItems;
  },

  async test({ auth }) {
    const client = makeClient(auth as TautulliAuthValue);
    const res = await client.call('get_recently_added');
    return res.response.data.slice(0, 3);
  },
});
