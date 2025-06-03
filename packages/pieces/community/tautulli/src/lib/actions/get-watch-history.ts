import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const getHistory = createAction({
  name: 'get-history',
  displayName: 'Get Watch History',
  description: 'Fetch watch history data from Tautulli with optional filters.',
  auth: tautulliAuth,
  props: {
    user: Property.ShortText({
      displayName: 'Username',
      required: false,
    }),
    userId: Property.Number({
      displayName: 'User ID',
      required: false,
    }),
    ratingKey: Property.Number({
      displayName: 'Rating Key',
      required: false,
    }),
    parentRatingKey: Property.Number({
      displayName: 'Parent Rating Key',
      required: false,
    }),
    grandparentRatingKey: Property.Number({
      displayName: 'Grandparent Rating Key',
      required: false,
    }),
    startDate: Property.ShortText({
      displayName: 'Start Date',
      description: 'Exact history date (YYYY-MM-DD)',
      required: false,
    }),
    before: Property.ShortText({
      displayName: 'Before',
      description: 'History before and including date (YYYY-MM-DD)',
      required: false,
    }),
    after: Property.ShortText({
      displayName: 'After',
      description: 'History after and including date (YYYY-MM-DD)',
      required: false,
    }),
    sectionId: Property.Number({
      displayName: 'Section ID',
      required: false,
    }),
    mediaType: Property.StaticDropdown({
      displayName: 'Media Type',
      required: false,
      options: {
        options: [
          { label: 'Movie', value: 'movie' },
          { label: 'Episode', value: 'episode' },
          { label: 'Track', value: 'track' },
          { label: 'Live', value: 'live' },
          { label: 'Collection', value: 'collection' },
          { label: 'Playlist', value: 'playlist' },
        ],
      },
    }),
    transcodeDecision: Property.StaticDropdown({
      displayName: 'Transcode Decision',
      required: false,
      options: {
        options: [
          { label: 'Direct Play', value: 'direct play' },
          { label: 'Copy', value: 'copy' },
          { label: 'Transcode', value: 'transcode' },
        ],
      },
    }),
    guid: Property.ShortText({
      displayName: 'GUID',
      required: false,
    }),
    orderColumn: Property.StaticDropdown({
      displayName: 'Order By',
      required: false,
      options: {
        options: [
          { label: 'Date', value: 'date' },
          { label: 'Friendly Name', value: 'friendly_name' },
          { label: 'IP Address', value: 'ip_address' },
          { label: 'Platform', value: 'platform' },
          { label: 'Player', value: 'player' },
          { label: 'Full Title', value: 'full_title' },
          { label: 'Started', value: 'started' },
          { label: 'Paused Counter', value: 'paused_counter' },
          { label: 'Stopped', value: 'stopped' },
          { label: 'Duration', value: 'duration' },
        ],
      },
    }),
    orderDir: Property.StaticDropdown({
      displayName: 'Sort Direction',
      required: false,
      options: {
        options: [
          { label: 'Descending', value: 'desc' },
          { label: 'Ascending', value: 'asc' },
        ],
      },
    }),
    start: Property.Number({
      displayName: 'Start Index',
      defaultValue: 0,
      required: false,
    }),
    length: Property.Number({
      displayName: 'Page Size',
      defaultValue: 25,
      required: false,
    }),
    search: Property.ShortText({
      displayName: 'Search',
      required: false,
    }),
    grouping: Property.Checkbox({
      displayName: 'Group Entries',
      required: false,
      defaultValue: false,
    }),
    includeActivity: Property.Checkbox({
      displayName: 'Include Activity',
      required: false,
      defaultValue: false,
    }),
  },
  async run({ propsValue, auth }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const params: Record<string, string> = {};

    if (propsValue.user) params["user"] = propsValue.user;
    if (propsValue.userId !== undefined) params["user_id"] = propsValue.userId.toString();
    if (propsValue.ratingKey !== undefined) params["rating_key"] = propsValue.ratingKey.toString();
    if (propsValue.parentRatingKey !== undefined) params["parent_rating_key"] = propsValue.parentRatingKey.toString();
    if (propsValue.grandparentRatingKey !== undefined) params["grandparent_rating_key"] = propsValue.grandparentRatingKey.toString();
    if (propsValue.startDate) params["start_date"] = propsValue.startDate;
    if (propsValue.before) params["before"] = propsValue.before;
    if (propsValue.after) params["after"] = propsValue.after;
    if (propsValue.sectionId !== undefined) params["section_id"] = propsValue.sectionId.toString();
    if (propsValue.mediaType) params["media_type"] = propsValue.mediaType;
    if (propsValue.transcodeDecision) params["transcode_decision"] = propsValue.transcodeDecision;
    if (propsValue.guid) params["guid"] = propsValue.guid;
    if (propsValue.orderColumn) params["order_column"] = propsValue.orderColumn;
    if (propsValue.orderDir) params["order_dir"] = propsValue.orderDir;
    if (propsValue.start !== undefined) params["start"] = propsValue.start.toString();
    if (propsValue.length !== undefined) params["length"] = propsValue.length.toString();
    if (propsValue.search) params["search"] = propsValue.search;
    if (propsValue.grouping) params["grouping"] = '1';
    if (propsValue.includeActivity) params["include_activity"] = '1';

    const response = await client.call('get_history', params);
    return response;
  },
});
