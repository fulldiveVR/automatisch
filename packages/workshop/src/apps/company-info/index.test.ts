import axios from 'axios';
import {
    IActionItem,
    IApp,
    IGlobalVariable,
    IRawAction,
} from '@automatisch/types';

import app from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const companyInfo = {
    domain: 'gucci.com',
    name: 'Gucci',
};

describe('company-info', () => {
    const $: IGlobalVariable = {
        http: mockedAxios,
        auth: {
            set: async () => null,
            data: undefined,
        },
        app: app as IApp,
    };

    describe('app', () => {
        it('should be defined', () => {
            expect(app).toBeDefined();
        })

        it('should be correct apiBaseUrl', () => {
            expect(app.apiBaseUrl).toBe('https://companies-datas.p.rapidapi.com')
        })
    });

    describe('actions', () => {
        describe('fetch', () => {
            const fetchAction = $.app.actions.find(
                (action) => action.key === 'fetchInfo'
            ) as IRawAction;

            it('should be defined', () => {
                expect(fetchAction).toBeDefined();
            });

            it('should be defined `domain` variable', () => {
                expect(fetchAction.arguments[0].key).toBe('domain');
            });

            it('should fetch company info', async () => {
                mockedAxios.get.mockResolvedValueOnce({ data: companyInfo });

                $.step = {
                    id: fetchAction.key,
                    appKey: app.key,
                    parameters: {
                        domain: companyInfo.domain,
                    },
                };

                $.setActionItem = (actionItem: IActionItem) => {
                    expect(actionItem.raw).toEqual(companyInfo);
                }

                await fetchAction.run($);

                expect(mockedAxios.get).toHaveBeenLastCalledWith(`/v2/company?query=${companyInfo.domain}`);
            });
        });
    });
});
