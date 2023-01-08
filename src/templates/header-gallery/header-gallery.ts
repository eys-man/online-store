import Component from '../components';
import Selector from '../selector/selector';
import Found from '../found/found';
import './header-gallery.css';
import Search from '../search/search';
import ViewMode from '../view-mode/view-mode';

class HeaderGallery extends Component {
    selector: Selector;
    found: Found;
    search: Search;
    viewMode: ViewMode;
    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.selector = new Selector('select', 'selector');
        this.found = new Found('div', 'found');
        this.search = new Search('div', 'search');
        this.viewMode = new ViewMode('div', 'view-mode');
    }

    render() {
        this.container.append(this.selector.render());
        this.container.append(this.found.render());
        this.container.append(this.search.render());
        this.container.append(this.viewMode.render());

        return this.container;
    }
}

export default HeaderGallery;
