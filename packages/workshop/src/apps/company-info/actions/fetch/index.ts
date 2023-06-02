import defineAction from '../../../../helpers/define-action';

export default defineAction({
    name: 'Get company info',
    key: 'fetchInfo',
    description: 'Getting company info.',
    arguments: [
        {
            label: 'Company domain',
            key: 'domain',
            type: 'string' as const,
            required: true,
            placeholder: "gucci.com",
            description: 'Provide a company domain. Example: gucci.com',
            variables: true,
        },
    ],

    async run($) {
        const domain = $.step.parameters.domain as string;
        const { data } = await $.http.get(`/v2/company?query=${domain}`);
        $.setActionItem({ raw: data });
    },
});
