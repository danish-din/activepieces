import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { TautulliAuthValue } from '../common/types';

export const newStreamStarted = createTrigger({
  name: 'new_stream_started',
  displayName: 'New Activity Detected (Active Stream Started)',
  description: 'Triggers when a new stream starts in Tautulli.',
  auth: tautulliAuth,
  type: TriggerStrategy.POLLING,
  props: {},
  sampleData: {
    session_id: 'abc123',
    user: 'example_user',
    media_type: 'movie',
    title: 'Inception',
    platform: 'Chrome',
  },
  async onEnable() {
    // no-op
  },
  async onDisable() {
    // no-op
  },
  async run({ auth, store }) {
    const client = makeClient(auth as TautulliAuthValue);
    const res = await client.call('get_activity');
    const sessions: any[] = res?.response?.data?.sessions ?? [];

    const previousSessionIds: string[] = (await store.get('session_ids')) ?? [];
    const newSessions = sessions.filter((s: any) => !previousSessionIds.includes(s.session_id));

    await store.put('session_ids', sessions.map((s: any) => s.session_id));

    return newSessions.map((s: any) => ({
      id: s.session_id,
      data: s,
    }));
  },
  async test({ auth }) {
    const client = makeClient(auth as TautulliAuthValue);
    const res = await client.call('get_activity');
    const sessions: any[] = res?.response?.data?.sessions ?? [];

    return sessions.map((s: any) => ({
      id: s.session_id,
      data: s,
    }));
  },
});
