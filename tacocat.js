import { componentFromFunction } from './component.js';
import './webcomponent.js';

export { Component } from './component.js';

/**
 * @typedef {Node | Component | FunctionComponent} ComponentType
 * @typedef {ComponentType | Array<ComponentType>} RenderResult
 * @typedef {(utils?: typeof renderUtils) => RenderResult} FunctionComponent
 */

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
 * Renders `comp` to element `target`
 * @param {ComponentType} comp Component to render
 * @param {HTMLElement} target Element to render to
 */
export function render(comp, target) {
    if(comp instanceof Component) {
        render(comp._getNode(), target);
    } else if (comp instanceof Function) {
        render(componentFromFunction(comp), target);
    } else {
        target.appendChild(comp);
    }
}
/**
 * Hyperscript interop
 */
export function h(tag, props, children) {
    if(typeof children == 'undefined' && typeof props != 'object') {
        children = props;
        props = null;
    }
    if(typeof children == 'string') children = [renderUtils.text(children)];
    let actualProps = props || {};
    actualProps.children = [];
    try {
        for(let child of children) {
            actualProps.children.push(child);
        }
    } catch {}
    if(typeof tag == 'string') {
        return renderUtils.tag(tag, actualProps);
    } else if (typeof tag == 'function') {
        return new (componentFromFunction(tag(actualProps)))(actualProps);
    } else {
        return new tag(actualProps);
    }
}