module JSONView {
    angular.module('JSONView', [])
        .filter('jsonView', () => {
            return (json: string, options: JSONView.IOptions): string => {
                const ast = parse(json);
                return new Highlight(ast, options).highlight();
            };
        });

    class Highlight {
        constructor(private ast: IJSONAst, private options: IOptions) {
        }

        beforeParse(ast: IJSONAst, level: number) {
            if (this.options && this.options.beforeParse) ast = this.options.beforeParse(ast, level, this.ast);
            return ast;
        }

        highlight(ast: IJSONAst = this.ast, indent: number = this.options.initialIndent || 0): string {
            ast = this.beforeParse(ast, indent / 2);

            let types = ['object', 'property', 'array', 'key', 'string', 'number', 'true', 'false', 'null'];
            if (types.indexOf(ast.type) > -1) {
                return this[`highlight_${ast.type}`](ast, indent);
            }

            return ast.value;
        }

        highlight_object(ast: IJSONAst, indent: number = 0): string {
            const i = this.repeat(indent, ' ');
            let root = [this.tag('{', 'braces'), '', i + this.tag('}', 'braces')];
            let join = "\n";
            root[1] = ast.properties.map((property) => this.highlight(property, indent + 2)).join(this.tag(',', 'comma') + "\n");
            if (!root[1].length) {
                join = '';
                root[2] = this.tag('}', 'braces');
            }
            return this.tag(root.join(join), ast.type);
        }

        highlight_property(ast: IJSONAst, indent: number = 0) {
            const i = this.repeat(indent, ' ');
            let root = [i + this.highlight(ast.key, indent), this.tag(':', 'colon') + ' ', this.highlight(ast.value, indent)];
            return this.tag(root.join(''), ast.type);
        }

        highlight_array(ast: IJSONAst, indent: number = 0) {
            const i = this.repeat(indent, ' ');
            let root = [this.tag('[', 'brackets'), '', i + this.tag(']', 'brackets')];
            let join = "\n";
            root[1] = ast.items.map(item => this.repeat(indent + 2, ' ') + this.highlight(item, indent + 2)).join(this.tag(',', 'comma') + "\n");
            if (!root[1].length) {
                root[2] = this.tag(']', 'brackets');
                join = '';
            }
            return this.tag(root.join(join), ast.type);
        }

        highlight_key(ast: IJSONAst) {
            return this.highlight_string(ast);
        }

        highlight_string(ast: IJSONAst) {
            return this.tag(`"${ast.value}"`, ast.type);
        }

        highlight_number(ast: IJSONAst) {
            return this.tag(ast.value, ast.type);
        }

        highlight_true(ast: IJSONAst) {
            return this.tag('true', ast.type);
        }

        highlight_false(ast: IJSONAst) {
            return this.tag('false', ast.type);
        }

        highlight_null(ast: IJSONAst) {
            return this.tag('null', ast.type);
        }

        tag(value: string, className: string) {
            return `<span class="json-view-${className}">${value}</span>`;
        }

        repeat(repeat: number, string: string): string {
            return new Array(repeat + 1).join(string);
        }
    }

    export interface IOptions {
        beforeParse: (ast: IJSONAst, level: number, topLevelAst: IJSONAst) => IJSONAst;
        initialIndent: number;
    }
}