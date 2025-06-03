import { createAction, Property } from '@activepieces/pieces-framework';
import { tautulliAuth } from '../..';
import { makeClient } from '../common';
import { PiecePropValueSchema } from '@activepieces/pieces-framework';

export const delete_hosted_images = createAction({
  name: 'delete-hosted-images',
  displayName: 'Delete Hosted Images',
  description: 'Delete the images uploaded to image hosting services.',
  auth: tautulliAuth,
  props: {
    rating_key: Property.Number({
      displayName: 'Rating Key',
      description: 'The movie, show, season, artist, or album rating key.',
      required: false,
    }),
    service: Property.StaticDropdown({
      displayName: 'Service',
      description: 'Image hosting service to delete from.',
      required: false,
      options: {
        options: [
          { label: 'Imgur', value: 'imgur' },
          { label: 'Cloudinary', value: 'cloudinary' },
        ],
      },
    }),
    delete_all: Property.Checkbox({
      displayName: 'Delete All',
      description: 'Delete all images from the service.',
      required: false,
    }),
  },
  async run({ auth, propsValue }) {
    const client = makeClient(auth as PiecePropValueSchema<typeof tautulliAuth>);
    const response = await client.call('delete_hosted_images', {
      rating_key: String(propsValue.rating_key),
      service: String(propsValue.service),
      delete_all: String(propsValue.delete_all),

    });
    return response;
  },
});
