import { renderUtils } from "./render-utils.js";

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
     * @returns {RenderResult}
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

export function componentFromFunction(fn) {
    return class extends Component {
        render(utils) {
            return fn(this.options, utils);
        }
    }
}