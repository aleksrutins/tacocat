import './webcomponent.js';
export const renderUtils = {
    tag(name, props, onCreated) {
        props = props || {};
        onCreated = onCreated || props.onCreated || (function(){});
        const elem = document.createElement(name);
        const attribs = props.attributes || {};
        delete props.attributes;
        const children = props.children || [];
        delete props.children;
        const cssClasses = props.cssClasses || [];
        delete props.cssClasses;
        const events = props.events || [];
        delete props.events;
        const style = props.style;
        delete props.style;
        Object.assign(elem, props);
        for(let attribute in attribs) {
            if(attribs.hasOwnProperty(attribute)) elem.setAttribute(attribute, attribs[attribute]);
        }
        for(let child of children) {
            render(child, elem);
        }
        for(let cssClass of cssClasses) {
            elem.classList.add(cssClass);
        }
        for(let event in events) {
            if(events.hasOwnProperty(event)) elem.addEventListener(event, events[event]);
        }
        for(let key in style) {
            elem.style[key] = style[key];
        }
        onCreated(elem);
        return elem;
    },
    text(content) {
        return document.createTextNode(content);
    }
}
/**
 * Base class for reusable components.
 * DO NOT override constructor(). Instead use componentCreated().
 * @property {Object} options Options passed to the component (Properties of HTMLElement and `cssClasses`).
 * @property {Array<Component | HTMLElement>} children Children of the component. (Shorthand for `options.children`, but non-nullable.)
 * @property {Object} attributes Attributes of the component (Shorthand for `options.attributes`, but non-nullable.)
 */
export class Component {
    constructor(options) {
        this.options = options;
        this.options.cssClasses = this.options.cssClasses || [];
        this.children = options.children || [];
        this.attributes = options.attributes || {};
        this.id = options.id;
        this.shadowMode = 'open';
        this.componentCreated();
    }
    componentCreated() {}
    /**
     * @returns {Array<Node> | Node}
     */
    render() {
        return this.children;
    }
    _getNode() {
        let elem = document.createElement('tacocat-component');
        elem.loadComponent(this, renderUtils, render);
        return elem;
    }
    rerender() {
        let parent;
        try {
            parent = this.elem.parentElement;
        } catch(e) {
            return;
        }
        if(parent == null) return;
        parent.removeChild(this.elem);
        render(this, parent);
    }
}

/**
 * Renders `comp` to element `target`
 * @param {Component | Node} comp Component to render
 * @param {HTMLElement} target Element to render to
 */
export function render(comp, target) {
    if(comp instanceof Component) {
        render(comp._getNode(), target);
    } else {
        target.appendChild(comp);
    }
}
/**
 * Hyperscript interop
 */
export function h(tag, props, children) {
    let actualProps = props || {};
    if(typeof children == 'string') children = [renderUtils.text(children)];
    actualProps.children = children || [];
    if(typeof tag == 'string') {
        return renderUtils.tag(tag, actualProps);
    } else {
        return new tag(actualProps);
    }
}