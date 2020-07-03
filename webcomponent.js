class TacocatComponent extends HTMLElement {
    constructor() {
        super();
    }
    loadComponent(component, renderUtls, render) {
        let shadow = this.attachShadow({mode: component.shadowMode});
        let renderResult = component.render(renderUtls);
        if(!(renderResult instanceof Array)) {
            renderResult = [renderResult];
        }
        let frag = document.createDocumentFragment();
        if(component.id) this.id = component.id;
        this.tacocatComponent = component;
        component.htmlElement = this;
        for(let renderedElem of renderResult) {
            render(renderedElem, frag);
        }
        shadow.appendChild(frag);
        this.setAttribute('class', component.constructor.name);
    }
}

customElements.define('tacocat-component', TacocatComponent);
