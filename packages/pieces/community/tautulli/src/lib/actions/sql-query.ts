import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const sqlQuery = createAction({
  name: 'sql_query',
  displayName: 'SQL Query',
  description: 'Query the Tautulli database with raw SQL. Automatically makes a backup of the database if the latest backup is older than 24 hours. Requires api_sql to be manually enabled in the config file while Tautulli is shut down.',
  auth: tautulliAuth,
  props: {
    query: Property.ShortText({
      displayName: 'SQL Query',
      required: true,
      description: 'The SQL query to execute.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    await client.call('sql', {
      query: propsValue.query,
    });
  },
});