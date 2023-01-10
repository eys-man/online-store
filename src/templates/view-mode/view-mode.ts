import MainPage from '../../pages/main';
import Component from '../components';
import Data from '../data';

import './view-mode.css';

class ViewMode extends Component {
    linear: HTMLButtonElement;
    tiles: HTMLButtonElement;

    constructor(tagName: string, className: string) {
        super(tagName, className);

        this.linear = document.createElement('button');
        this.linear.className = 'view';
        if (Data.viewMode === 'linear') this.linear.classList.add('active');
        this.linear.textContent = '▤';

        this.tiles = document.createElement('button');
        this.tiles.className = 'view';
        if (Data.viewMode === 'tiles') this.tiles.classList.add('active');
        this.tiles.textContent = '▦';
    }

    render() {
        this.container.append(this.linear);
        this.container.append(this.tiles);

        // TODO: сделать делегирование от this.container
        this.tiles.addEventListener('click', async () => {
            if (Data.viewMode === 'linear') {
                Data.viewMode = 'tiles';
                this.linear.classList.remove('active');
                this.tiles.classList.add('active');
                MainPage.gallery.render();
                localStorage.setItem('viewMode', Data.viewMode);
                await Data.makeURL();
            }
        });

        this.linear.addEventListener('click', async () => {
            if (Data.viewMode === 'tiles') {
                Data.viewMode = 'linear';
                this.tiles.classList.remove('active');
                this.linear.classList.add('active');
                MainPage.gallery.render();

                localStorage.setItem('viewMode', Data.viewMode);
                await Data.makeURL();
            }
        });

        return this.container;
    }
}

export default ViewMode;
