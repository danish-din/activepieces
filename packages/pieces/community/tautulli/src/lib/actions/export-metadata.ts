import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const exportMetadata = createAction({
  name: 'export_metadata',
  displayName: 'Export Metadata',
  description: 'Export library or media metadata to a file.',
  auth: tautulliAuth,
  props: {
    sectionId: Property.Number({
      displayName: 'Section ID',
      required: false,
      description: 'The section ID of the library items to export.',
    }),
    userId: Property.Number({
      displayName: 'User ID',
      required: false,
      description: 'The user ID of the playlist items to export.',
    }),
    ratingKey: Property.Number({
      displayName: 'Rating Key',
      required: false,
      description: 'The rating key of the media item to export.',
    }),
    fileFormat: Property.ShortText({
      displayName: 'File Format',
      required: false,
      description: 'The format of the export file (e.g., csv, json, xml, m3u). Default is csv.',
    }),
    metadataLevel: Property.Number({
      displayName: 'Metadata Level',
      required: false,
      description: 'The level of metadata to export (default 1).',
    }),
    mediaInfoLevel: Property.Number({
      displayName: 'Media Info Level',
      required: false,
      description: 'The level of media info to export (default 1).',
    }),
    thumbLevel: Property.Number({
      displayName: 'Thumbnail Level',
      required: false,
      description: 'The level of poster/cover images to export (default 0).',
    }),
    artLevel: Property.Number({
      displayName: 'Artwork Level',
      required: false,
      description: 'The level of background artwork images to export (default 0).',
    }),
    logoLevel: Property.Number({
      displayName: 'Logo Level',
      required: false,
      description: 'The level of logo images to export (default 0).',
    }),
    customFields: Property.ShortText({
      displayName: 'Custom Fields',
      required: false,
      description: 'Comma-separated list of custom fields to export.',
    }),
    exportType: Property.ShortText({
      displayName: 'Export Type',
      required: false,
      description: 'Specify "collection" or "playlist" for library/user export.',
    }),
    individualFiles: Property.Checkbox({
      displayName: 'Individual Files',
      required: false,
      description: 'Export each item as an individual file for library/user export.',
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('export_metadata', {
      section_id: String(propsValue.sectionId ?? ''),
      user_id: String(propsValue.userId ?? ''),
      rating_key: String(propsValue.ratingKey ?? ''),
      file_format: propsValue.fileFormat ?? 'csv',
      metadata_level: String(propsValue.metadataLevel ?? 1),
      media_info_level: String(propsValue.mediaInfoLevel ?? 1),
      thumb_level: String(propsValue.thumbLevel ?? 0),
      art_level: String(propsValue.artLevel ?? 0),
      logo_level: String(propsValue.logoLevel ?? 0),
      custom_fields: propsValue.customFields ?? '',
      export_type: propsValue.exportType ?? '',
      individual_files: String(propsValue.individualFiles ?? false),
    });
    return response;
  },
});