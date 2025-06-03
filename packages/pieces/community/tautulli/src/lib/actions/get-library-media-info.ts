import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getLibraryMediaInfo = createAction({
  name: 'get-library-media-info',
  displayName: 'Get Library Media Info',
  description: 'Fetch media items from a Tautulli library section or by rating key.',
  auth: tautulliAuth,
  props: {
    sectionId: Property.Number({
      displayName: 'Section ID',
      description: 'The ID of the Plex library section.',
      required: false,
    }),
    ratingKey: Property.ShortText({
      displayName: 'Rating Key',
      description: 'The parent or grandparent rating key of the media item.',
      required: false,
    }),
    sectionType: Property.StaticDropdown({
      displayName: 'Section Type',
      description: 'Filter by type of media.',
      required: false,
      options: {
        options: [
          { label: 'Movie', value: 'movie' },
          { label: 'Show', value: 'show' },
          { label: 'Artist', value: 'artist' },
          { label: 'Photo', value: 'photo' },
        ],
      },
    }),
    orderColumn: Property.StaticDropdown({
      displayName: 'Order By',
      description: 'Field to sort the results by.',
      required: false,
      options: {
        options: [
          { label: 'Added At', value: 'added_at' },
          { label: 'Sort Title', value: 'sort_title' },
          { label: 'Container', value: 'container' },
          { label: 'Bitrate', value: 'bitrate' },
          { label: 'Video Codec', value: 'video_codec' },
          { label: 'Video Resolution', value: 'video_resolution' },
          { label: 'Video Framerate', value: 'video_framerate' },
          { label: 'Audio Codec', value: 'audio_codec' },
          { label: 'Audio Channels', value: 'audio_channels' },
          { label: 'File Size', value: 'file_size' },
          { label: 'Last Played', value: 'last_played' },
          { label: 'Play Count', value: 'play_count' },
        ],
      },
    }),
    orderDir: Property.StaticDropdown({
      displayName: 'Sort Direction',
      description: 'Sort ascending or descending.',
      required: false,
      options: {
        options: [
          { label: 'Ascending', value: 'asc' },
          { label: 'Descending', value: 'desc' },
        ],
      },
    }),
    start: Property.Number({
      displayName: 'Start Index',
      description: 'Row index to start from (pagination). Default is 0.',
      required: false,
      defaultValue: 0,
    }),
    length: Property.Number({
      displayName: 'Page Size',
      description: 'Number of results to return. Default is 25.',
      required: false,
      defaultValue: 25,
    }),
    search: Property.ShortText({
      displayName: 'Search',
      description: 'A string to search for (e.g., "Thrones").',
      required: false,
    }),
    refresh: Property.Checkbox({
      displayName: 'Refresh Cache',
      description: 'Force a refresh of the media info cache.',
      required: false,
      defaultValue: false,
    }),
  },
  async run({ propsValue, auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const params: Record<string, string> = {};

    if (propsValue.sectionId !== undefined) {
      params['section_id'] = propsValue.sectionId.toString();
    }

    if (propsValue.ratingKey) {
      params['rating_key'] = propsValue.ratingKey;
    }

    if (propsValue.sectionType) {
      params['section_type'] = propsValue.sectionType;
    }

    if (propsValue.orderColumn) {
      params['order_column'] = propsValue.orderColumn;
    }

    if (propsValue.orderDir) {
      params['order_dir'] = propsValue.orderDir;
    }

    if (propsValue.start !== undefined) {
      params['start'] = propsValue.start.toString();
    }

    if (propsValue.length !== undefined) {
      params['length'] = propsValue.length.toString();
    }

    if (propsValue.search) {
      params['search'] = propsValue.search;
    }

    if (propsValue.refresh) {
      params['refresh'] = 'true';
    }

    const response = await client.call('get_library_media_info', params);
    return response;
  },
});
