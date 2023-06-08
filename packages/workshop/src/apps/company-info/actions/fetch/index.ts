import defineAction from '../../../../helpers/define-action';
import summarizeContent from './content-summary';
import fetchPageContent from './page-content';
import cleanUrl from './clean-url';

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
            placeholder: "google.com",
            description: 'Provide a company domain. Example: google.com',
            variables: true,
        },
    ],

    async run($) {
        const url = cleanUrl($.step.parameters.domain as string);
        const pageContent = await fetchPageContent($, url);
        const summary = await summarizeContent($, pageContent);

        $.setActionItem({
            raw: { url, summary },
        });
    },
});
