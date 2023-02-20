import Block from "../../utils/Block";
import template from "./home.hbs";

interface HomePageProps {
    title: string;
}

class HomePage extends Block {
    constructor(props: HomePageProps) {
        super(props);
    }

    init() {
        // this.children.button = new Button({
        //     label: 'Click me',
        //     classes: 'test classes',
        //     events: {
        //         click: () => {
        //             const value = (this.children.input as Input).value;
        //             console.log('TEST');
        //             console.log(value);
        //         },
        //     },
        // });
        // this.children.inputs = [new Input(), new Input(), new Input(), new Input()];
    }

    handleClick() {
        console.log('Clicked');
        // const data = this.children.inputs.map(child => child.value);
        // const result = ProfileController.validate(data)
        // this.setProps({error: result});
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props, handleClick: this.handleClick.bind(this)});
    }
};

export default HomePage;
