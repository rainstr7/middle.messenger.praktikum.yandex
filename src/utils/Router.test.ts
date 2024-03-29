import Router, {BlockConstructable} from './Router'
import {expect} from 'chai';

const sinon = require('sinon');

describe('Router', () => {
    let originalBack = global.window.history.back;
    let originalForward = global.window.history.forward;

    before(() => {
        global.window.history.back = () => {
            if (typeof window.onpopstate === 'function') {
                window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
            }
        };
        global.window.history.forward = () => {
            if (typeof window.onpopstate === 'function') {
                window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
            }
        }
    });

    after(() => {
        global.window.history.back = originalBack;
        global.window.history.forward = originalForward;
    });

    const getContentFake = sinon.fake.returns(document.createElement('div'));

    const BlockMock = class {
        getContent = getContentFake;
    } as unknown as BlockConstructable;

    it('use() should return Router instance', () => {
        const result = Router.use('/', BlockMock);

        expect(result).to.eq(Router);
    });

    describe('.back()', () => {
        it('should render a page on history back action', () => {
            Router
                .use('/', BlockMock)
                .start();

            Router.back();

            expect(getContentFake.callCount).to.eq(1);
        });
    });

    it('should render a page on start', () => {
        Router
            .use('/', BlockMock)
            .start();

        expect(getContentFake.callCount).to.eq(1);
    });
});
