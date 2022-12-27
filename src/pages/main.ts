import Page from '../templates/page';

class MainPage extends Page {
    static TextObject = {
        MainTitle: 'Main Page',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const p = document.createElement('p');
        p.innerHTML = MainPage.TextObject.MainTitle;
        this.container.append(p);
        return this.container;
    }
}

export default MainPage;
