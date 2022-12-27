import Component from './components';

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    render() {
        const link = document.createElement('a');
        link.className = 'link';
        link.href = '#main-page';
        const h1 = document.createElement('h1');
        h1.className = 'h1';
        h1.innerHTML = 'Online Store';
        link.append(h1);
        this.container.append(link);

        return this.container;
    }
}

export default Header;
