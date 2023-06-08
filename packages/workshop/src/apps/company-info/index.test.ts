import { IApp, IRawAction } from '@automatisch/types';

import app from './index';

describe('company-info', () => {
    describe('app', () => {
        it('should be defined', () => {
            expect(app).toBeDefined();
        })
    });

    describe('actions', () => {
        describe('fetch', () => {
            let action: IRawAction;

            beforeEach(() => {
                action = (app as IApp).actions.find(
                    (action) => action.key === 'fetchInfo'
                ) as IRawAction;
            });

            it('should be defined', () => {
                expect(action).toBeDefined();
            });

            it('should be defined `domain` variable', () => {
                expect(action.arguments[0].key).toBe('domain');
            });
        });
    });
});