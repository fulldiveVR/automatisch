import defineAction from '../../../../helpers/define-action';

export default defineAction({
  name: 'Mark the cat image as favorite',
  key: 'markCatImageAsFavorite',
  description: 'Marks the cat image as favorite.',
  arguments: [
    {
      label: 'Image ID',
      key: 'imageId',
      type: 'string' as const,
      required: true,
      description: 'The ID of the cat image you want to mark as favorite.',
      variables: true,
    },
  ],

  async run($) {
    const requestPath = '/v1/favourites';
    const imageId = $.step.parameters.imageId;

    const headers = {
      'x-api-key': $.auth.data.apiKey as string,
    };

    const response = await $.http.post(
      requestPath,
      { image_id: imageId },
      { headers }
    );

    $.setActionItem({ raw: response.data });
  },
});
