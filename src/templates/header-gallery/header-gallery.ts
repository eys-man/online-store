import Component from '../components';
import Selector from '../selector/selector';
import Found from '../found/found';
import './header-gallery.css';

class HeaderGallery extends Component {
    selector: Selector;
    found: Found;
    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.selector = new Selector('select', 'selector');
        this.found = new Found('div', 'found');
    }

    render() {
        this.container.append(this.selector.render());
        this.container.append(this.found.render());

        return this.container;
    }
}

export default HeaderGallery;
