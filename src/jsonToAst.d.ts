declare function parse(json: string): IJSONAst;
declare interface IJSONAst {
    type: string; // object|property|key|array|string|number|true|false|null
    properties?: IJSONAst[];
    items?: any[];
    value?: any;
    key?: IJSONAst;
    position: IJSONAstPosition
}
declare interface IJSONAstPosition {
    start: IJSONAstPositionPoint;
    end: IJSONAstPositionPoint;
    human: string;
}
declare interface IJSONAstPositionPoint {
    line: number;
    column: number;
    char: number;
}