import {TacocatComponent} from './webcomponent';
declare module "tacocat" {
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
    }
    export function render(comp: Component, target: HTMLElement): void;
}