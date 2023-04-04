import Button from './index';
import {expect} from 'chai';

describe('Button', () => {
    const props = {
        onClick: (event: MouseEvent) => console.log(event),
        classNames: '',
        events: {
            click: (event: MouseEvent) => console.log(event),
            onsubmit: (event: MouseEvent) => console.log(event),
        },
        id: 'test'
    }
    it('should render', () => {
        new Button({...props});
    });

    it('element id should be "test"', () => {
        const button = new Button({...props});
        const element = button.element;
        expect(element!.id).to.eq('test')
    });

    it('element should return button', () => {
        const button = new Button({...props});
        const element = button.element;
        expect(element).to.be.instanceof(window.HTMLButtonElement)

    });
});
