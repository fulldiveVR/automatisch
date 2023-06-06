import qs from 'qs';
import defineAction from '../../../../helpers/define-action';
import { okSignature } from '../../common/get-signature';

export default defineAction({
  name: 'Send message',
  key: 'sendMessage',
  description: 'Sends a message to a group you specify.',
  arguments: [
    {
      label: 'Group ID',
      key: 'group_id',
      type: 'string' as const,
      required: true,
      description: 'Unique identifier for the target group.',
      variables: true,
    },
    {
      label: 'Message text',
      key: 'text',
      type: 'string' as const,
      required: true,
      description: 'Text of the message to be sent, 1-4096 characters.',
      variables: true,
    },
  ],

  async run($) {
    let params: any = {
      gid: $.step.parameters.group_id,
      type: 'GROUP_THEME',
      application_key: $.auth.data.client_public,
      attachment: JSON.stringify({
        media: [
          {
            type: 'text',
            text: $.step.parameters.text
          }
        ]
      }),
      format: 'json',
    };

    params.sig = okSignature(params, $.auth.data.accessToken as string);
    params.access_token = $.auth.data.accessToken;

    const response = await $.http.get('/api/mediatopic/post', { params });

    $.setActionItem({
      raw: {
        id: response.data
      },
    });
  },
});
