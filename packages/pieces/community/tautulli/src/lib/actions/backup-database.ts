import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common/client';
import { TautulliAuthValue } from '../common/types';

export const backupDatabase = createAction({
  name: 'backup-database',
  displayName: 'Backup Database',
  description: 'Create a manual backup of the plexpy.db file.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as TautulliAuthValue);
    const response = await client.call('backup_db');
    return response;
  },
});