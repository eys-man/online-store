import Component from '../components';

class CheckBoxLine extends Component {
    private id: string; // название категории/брэнда, он же - id элемента
    private num: number; // число вхождений элемента в список
    constructor(tagName: string, className: string, id: string, num: number) {
        super(tagName, className);
        this.id = id;
        this.num = num;
    }

    render() {
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = this.id;
        this.container.append(input);

        const label = document.createElement('label');
        label.setAttribute('for', this.id);
        label.innerText = this.id;
        this.container.append(label);

        const span = document.createElement('label');
        span.innerText = ` - (${this.num})`;
        this.container.append(span);

        this.container.id = this.id;

        return this.container;
    }
}

export default CheckBoxLine;
