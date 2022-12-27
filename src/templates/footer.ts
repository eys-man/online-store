import Component from './components';

class Footer extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    render() {
        const ul = document.createElement('ul');
        ul.className = 'footer-ul';

        const li1 = document.createElement('li');
        const linkSchool = document.createElement('a');
        linkSchool.href = 'https://rs.school/js/';
        linkSchool.className = 'link';
        const imgSchool = document.createElement('img');
        imgSchool.src = 'img/logo_rs_school.svg';
        linkSchool.append(imgSchool);
        li1.append(linkSchool);

        ul.append(li1);

        const li2 = document.createElement('li');
        const p = document.createElement('p');
        p.innerHTML = '2022';
        li2.append(p);

        ul.append(li2);

        const li3 = document.createElement('li');
        const linkGit1 = document.createElement('a');
        linkGit1.className = 'link';
        linkGit1.href = 'https://github.com/eys-man';
        const p1 = document.createElement('p');
        p1.innerHTML = 'eys-man';
        linkGit1.append(p1);
        const imgGit1 = document.createElement('img');
        imgGit1.src = 'img/logo_github.png';
        linkGit1.append(imgGit1);
        li3.append(linkGit1);

        const linkGit2 = document.createElement('a');
        linkGit2.className = 'link';
        linkGit2.href = 'https://github.com/AndreyTishchenko';
        const imgGit2 = document.createElement('img');
        imgGit2.src = 'img/logo_github.png';
        linkGit2.append(imgGit2);
        const p2 = document.createElement('p');
        p2.innerHTML = 'AndreyTishchenko';
        linkGit2.append(p2);
        li3.append(linkGit2);

        ul.append(li3);

        this.container.append(ul);

        return this.container;
    }
}

export default Footer;
