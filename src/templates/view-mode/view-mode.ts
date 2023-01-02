import Component from '../components';
import './view-mode.css';

type Mode = 'lines' | 'tiles';

class ViewMode extends Component {
    lines: HTMLButtonElement;
    tiles: HTMLButtonElement;
    mode: Mode;
    constructor(tagName: string, className: string) {
        super(tagName, className);

        this.lines = document.createElement('button');
        this.lines.className = 'view active';
        this.lines.innerText = '▤';

        this.tiles = document.createElement('button');
        this.tiles.className = 'view';
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
