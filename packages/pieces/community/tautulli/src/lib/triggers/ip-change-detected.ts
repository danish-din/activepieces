import { createTrigger, TriggerStrategy, PiecePropValueSchema } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';

export const ipChangeDetected = createTrigger({
    name: 'ip_change_detected',
    displayName: 'IP Change Detected',
    description: 'Triggers when a user\'s IP address changes.',
    type: TriggerStrategy.POLLING,
    auth: tautulliAuth,
    props: {},

    // Called when the trigger is first enabled
    async onEnable({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
        return;
    },

    // Called when the trigger is disabled
    async onDisable({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
        return;
    },

    // Called every polling interval
    async run({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
        const client = makeClient(auth);
        const response = await client.call('get_user_ips', {});

        return Array.isArray(response?.response?.data)
            ? response.response.data.map((entry: { user_id: number; ip_address: string }) => ({
                id: `${entry.user_id}-${entry.ip_address}`,
                data: entry,
            }))
            : [];
    },

    // Used to show a sample item in the UI
    async sampleData({ auth }: { auth: PiecePropValueSchema<typeof tautulliAuth> }) {
        const client = makeClient(auth);
        const response = await client.call('get_user_ips', {});
        return response?.response?.data?.[0] || {};
    },
});
