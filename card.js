'use strict'
// o extends é pra classe herdar propriedades de um objeto html comum

//primeiros passos. aqui o resultado foi um div com esses atributos e senai escrito dentro
/* class card extends HTMLElement {
    constructor(){
        super()
        const shadow = this.attachShadow({mode: 'open'});
        const html = document.createElement('div')
        const titulo = document.createElement('h1')
        html.appendChild(titulo)
        titulo.textContent = "senai jandira"
        const css = document.createElement('style')
        css.textContent=`
            div {
                background-color: tomato;
                width: 400px;
                height: 400px;
                color: white;
                place-items: center;
                display: grid;
                justify-content: center
            }
        `
        shadow.append(html,css)
    }
}
customElements.define('card-ingryd', card) */


//
class card extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' });
        this.nome = 'nome aluno'
        this.foto = null
        this.cor = 'tomato'
    }

    static get observedAttributes() {
        return ['nome', 'foto', 'cor']
    }

    attributeChangedCallback (nameAttr, oldValue, newValue){
        this[nameAttr] = newValue
    }

    connectedCallback() {
        /* append: posso colocar quantos eu quiser adicionando virgula
        appendchild: posso colocar apenas um por vez. por isso que aqui criei dois
        se fosse no append ficaria: this.shadow.append(this.styles(), this.component()) */
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }
    styles() {
        const css = document.createElement('style')
        css.textContent = `
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .card{
                width: 200px;
                height: 300px;
                display: grid;
                grid-template-rows: 20% 60% 20%;
                place-items: center;
                background-color: ${this.cor};
                box-shadow: 5px 6px 3px grey;
            }
            .card:hover{
                background-color: black;
                box-shadow: 5px 6px 3px grey;
                transition: .8s;
            }
            .card__text{
                color: white;
                font-size: 1.5rem;
                font-weight: 600;
            }
            .card__image{
                height:  100px;
                width: 100px;
                border-radius: 50%;
                background-color: white;
                background-image: url(${this.foto});
                background-size: cover;
            }
        `
        return css
    }

    component() {
        const card = document.createElement('div')
        card.classList.add('card')
        const nome = document.createElement('div')
        nome.classList.add('card__text')
        nome.textContent = this.nome
        const imagem = document.createElement('div')
        imagem.classList.add('card__image')
        const turma = document.createElement('div')
        turma.classList.add('card__text')
        turma.textContent = 'ds2m'
        card.append(nome, imagem, turma)
        return card
    }
}
customElements.define('card-ingryd', card)