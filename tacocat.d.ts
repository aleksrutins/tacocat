declare module "tacocat/webcomponent" {
    import {RenderUtilities, Component, render} from 'tacocat';
    export class TacocatComponent extends HTMLElement {
        public loadComponent(component: Component, renderUtls: RenderUtilities, renderFunc: typeof render): void;
    }
}
declare module "tacocat" {
    import {TacocatComponent} from 'tacocat/webcomponent';
    export interface TagOptions<TTag> extends Partial<HTMLElement> {
        children: (Component | Node)[];
        style: Partial<CSSStyleDeclaration>;
        cssClasses: string[];
        onCreated: (elem: TTag) => void;
    }
    export type RenderUtilities = {
        tag: <T extends HTMLElement>(name: string, options: Partial<TagOptions<T>>) => HTMLElement;
        text: (text: string) => Text
    }

    export class Component<TOptions extends Partial<TagOptions<any>> = Partial<TagOptions<HTMLElement>>> {
        constructor(options: Partial<TOptions>);
        componentCreated(): void;
        render(renderUtils: RenderUtilities): Component | Node | Node[];
        private _getNode(): TacocatComponent;
        rerender(): void;
        protected htmlElement: TacocatComponent;
        protected options: Partial<TOptions>;
    }
    export function render(comp: Component, target: Node): void;
}