declare module "tacocat/webcomponent" {
    import {RenderUtilities, Component, render} from 'tacocat';
    export class TacocatComponent extends HTMLElement {
        public loadComponent(component: Component, renderUtls: RenderUtilities, renderFunc: typeof render): void;
    }
}
declare module "tacocat" {
    import {TacocatComponent} from 'tacocat/webcomponent';
    export interface TagOptions extends HTMLElement {

    }
    export type RenderUtilities = {
        tag: (name: string, options: TagOptions) => HTMLElement;
        text: (text: string) => Text
    }
    export class Component {
        constructor(options: object);
        componentCreated(): void;
        render(renderUtils: RenderUtilities): Component | Node | Node[];
        private _getNode(): TacocatComponent;
        rerender(): void;
        protected htmlElement: TacocatComponent
    }
    export function render(comp: Component, target: HTMLElement): void;
}