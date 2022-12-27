/* eslint-disable no-unused-vars */
import Page from '../templates/page';

export const enum ErrorTypes {
    Error_404 = 404,
}

class ErrorPage extends Page {
    private errorType: ErrorTypes | string;

    static TextObject: { [prop: string]: string } = {
        '404': 'Error! This page is not exist.',
    };

    constructor(id: string, errorType: ErrorTypes | string) {
        super(id);
        this.errorType = errorType;
    }

    render() {
        const p = document.createElement('p');
        p.innerText = `${ErrorPage.TextObject[this.errorType]}`;
        this.container.append(p);
        return this.container;
    }
}

export default ErrorPage;
