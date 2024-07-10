declare module "tacocat/webcomponent" {
    import {RenderUtilities, Component, render} from 'tacocat';
    export class TacocatComponent extends HTMLElement {
        public loadComponent(component: Component, renderUtls: RenderUtilities, renderFunc: typeof render): void;
    }
}
declare module "tacocat/jsx-runtime" {
    export function h(tag: string | Function, props: any, children: any | null | undefined): Node;
    export const jsx: typeof h
}
declare module "tacocat" {
    import {TacocatComponent} from 'tacocat/webcomponent';
    export interface TagOptions<TTag> extends Partial<Omit<HTMLElement, 'attributes' | 'children' | 'style'>> {
        children: (Component | Node)[];
        style: Partial<CSSStyleDeclaration>;
        cssClasses: string[];
        onCreated: (elem: TTag) => void;
        attributes: {
            [name: string]: string;
        };
        id: string;
    }
    export interface ComponentOptions {
        id?: string;
    }
    export type RenderUtilities = {
        tag: <T extends HTMLElement>(name: string, options: Partial<TagOptions<T>>) => HTMLElement;
        text: (text: string) => Text
    }

    export abstract class Component<TOptions extends ComponentOptions = ComponentOptions> {
        constructor(options: Partial<TOptions>);
        componentCreated(): void;
        abstract render(renderUtils: RenderUtilities): Component | Node | Node[];
        private _getNode(): TacocatComponent;
        rerender(): void;
        protected htmlElement: TacocatComponent;
        protected options: Partial<TOptions>;
    }
    export function render(comp: Component | Node, target: Node): void;
    export const renderUtils: RenderUtilities;
}