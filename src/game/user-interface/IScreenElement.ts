export interface IScreenElement {
    onKeyDown(e: KeyboardEvent): void;
    onKeyUp(e: KeyboardEvent): void;

    setVisible(b: boolean): void;
    isVisible(): boolean;

    VOnRender(msDiff: number): any;
}
