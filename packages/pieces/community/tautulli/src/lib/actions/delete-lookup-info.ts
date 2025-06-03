import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_lookup_info = createAction({
  name: 'delete-lookup-info',
  displayName: 'Delete Lookup Info',
  description: 'Delete the 3rd party API lookup info.',
  auth: tautulliAuth,
  props: {
    rating_key: Property.Number({
      displayName: 'Rating Key',
      description: 'The movie, show, artist, album, or track rating key.',
      required: false,
    }),
    service: Property.StaticDropdown({
      displayName: 'Service',
      description: 'Lookup service to delete from.',
      required: false,
      options: {
        options: [
          { label: 'The Movie DB', value: 'themoviedb' },
          { label: 'TV Maze', value: 'tvmaze' },
          { label: 'MusicBrainz', value: 'musicbrainz' },
        ],
      },
    }),
    delete_all: Property.Checkbox({
      displayName: 'Delete All',
      description: 'Delete all lookup info from the service.',
      required: false,
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const params: Record<string, string> = {};

    if (propsValue['rating_key'] !== undefined) {
      params['rating_key'] = String(propsValue['rating_key']);
    }

    if (propsValue['service'] !== undefined) {
      params['service'] = String(propsValue['service']);
    }

    if (propsValue['delete_all'] !== undefined) {
      params['delete_all'] = String(propsValue['delete_all']);
    }

    const response = await client.call('delete_lookup_info', params);
    return response;
  },
});
