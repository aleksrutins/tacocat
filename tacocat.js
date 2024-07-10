import { componentFromFunction } from './component.js';
import './webcomponent.js';
import { renderUtils } from './render-utils.js';
import { Component } from './component.js';

export { Component, renderUtils };

/**
 * Renders `comp` to element `target`
 * @param {ComponentType} comp Component to render
 * @param {HTMLElement} target Element to render to
 */
export function render(comp, target) {
    if(comp instanceof Component) {
        render(comp._getNode(), target);
    } else if(comp instanceof Array) {
        const fragment = document.createDocumentFragment();
        for(let child of comp) {
            fragment.appendChild(child);
        }
        target.appendChild(fragment);
    } else {
        target.appendChild(comp);
    }
}
/**
 * Hyperscript interop
 */
export function h(tag, props, children) {
    if('children' in props) {
        children = props.children;
        delete props.children;
    }
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
    } else if (typeof tag == 'function' && !('_getNode' in tag.prototype)) {
        return new (componentFromFunction(tag))(actualProps);
    } else {
        return new tag(actualProps);
    }
}