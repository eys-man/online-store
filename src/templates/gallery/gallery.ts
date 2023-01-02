import Component from '../components';
import './gallery.css';

class Gallery extends Component {
    title: string;
    constructor(tagName: string, className: string, title: string) {
        super(tagName, className);
        this.title = title;
    }

    render() {
        return this.container;
    }
}

export default Gallery;
