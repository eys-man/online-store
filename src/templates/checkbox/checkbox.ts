import Component from '../components';

class CheckBoxLine extends Component {
    private id: string; // название категории/брэнда, он же - id элемента
    private num: number; // число вхождений элемента в список
    private numFiltered: number; // число вхождений элемента в список
    checked: boolean;
    constructor(tagName: string, className: string, id: string, checked: boolean, num: number, numFiltered: number) {
        super(tagName, className);
        this.id = id;
        this.num = num;
        this.numFiltered = numFiltered;
        this.checked = checked;
    }

    render() {
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = this.id;
        input.checked = this.checked;
        this.container.append(input);

        const label = document.createElement('label');
        label.setAttribute('for', this.id);
        label.innerText = this.id;
        this.container.append(label);

        const span = document.createElement('span');
        span.innerText = ` - (${this.numFiltered}/${this.num})`;
        this.container.append(span);

        this.container.id = this.id;

        return this.container;
    }
}

export default CheckBoxLine;
