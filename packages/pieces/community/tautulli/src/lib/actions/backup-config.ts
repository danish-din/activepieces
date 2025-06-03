import { createAction } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common/client';
import { TautulliAuthValue } from '../common/types';

export const backupConfig = createAction({
  name: 'backup-config',
  displayName: 'Backup Config',
  description: 'Create a manual backup of the config.ini file.',
  auth: tautulliAuth,
  props: {},
  async run({ auth }) {
    const client = makeClient(auth as TautulliAuthValue);
    const response = await client.call('backup_config');
    return response;
  },
});