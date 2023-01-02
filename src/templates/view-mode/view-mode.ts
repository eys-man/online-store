import Component from '../components';
import './view-mode.css';

type Mode = 'lines' | 'tiles';

class ViewMode extends Component {
    lines: HTMLElement;
    tiles: HTMLElement;
    mode: Mode;
    constructor(tagName: string, className: string) {
        super(tagName, className);

        this.lines = document.createElement('p');
        this.lines.className = 'view active';
        //this.lines.innerText = ' ▤☰ ';
        this.lines.innerText = '▤';

        this.tiles = document.createElement('p');
        this.tiles.className = 'view';
        // this.tiles.innerText = ' ▦☷ ';
        this.tiles.innerText = '▦';

        this.mode = 'lines';
    }

    render() {
        this.container.append(this.lines);
        this.container.append(this.tiles);

        this.tiles.addEventListener('click', () => {
            if (this.mode === 'lines') {
                this.mode = 'tiles';
                this.lines.classList.remove('active');
                this.tiles.classList.add('active');
            }
        });

        this.lines.addEventListener('click', () => {
            if (this.mode === 'tiles') {
                this.mode = 'lines';
                this.tiles.classList.remove('active');
                this.lines.classList.add('active');
                // TODE: обновить в Data режим отображения
            }
        });

        return this.container;
    }
}

export default ViewMode;
