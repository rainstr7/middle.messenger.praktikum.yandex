import {expect} from 'chai';
import type BlockType from './Block';
import proxyquire = require('proxyquire');

const sinon = require('sinon');

const eventBusMock = {
    on: sinon.stub(),
    emit: sinon.stub(),
}

const {default: Block} = proxyquire('./Block', {
    './EventBus': {
        default: class {
            emit = eventBusMock.emit;
            on = eventBusMock.on;
        }
    }
}) as { default: typeof BlockType };

describe('Block', () => {
    beforeEach(() => {
        eventBusMock.on.reset();
        eventBusMock.emit.reset();
    })

    class ComponentMock extends Block {
    }

    const block = new ComponentMock({})

    it('should fire init event on initialization', () => {
        new ComponentMock({});

        expect(eventBusMock.emit.calledWith('init')).to.eq(true);
    });

    it("getContent() return HTMLElement", () => {
        expect(block.getContent()).to.eq(block.element);
    });

    it('should fire protected componentDidMount on component-did-mount dispatch', () => {
        let isCalled = true

        class ComponentMock extends Block {
            componentDidMount(): void {
                isCalled = true
            }
        }

        const component = new ComponentMock({})
        component.dispatchComponentDidMount()
        expect(isCalled).to.eq(true)
    })
});
