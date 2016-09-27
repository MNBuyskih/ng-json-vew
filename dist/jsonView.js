var JSONView;
(function (JSONView) {
    angular.module('JSONView', [])
        .filter('jsonView', function () {
        return function (json, options) {
            var ast = parse(json);
            return new Highlight(options).highlight(ast);
        };
    });
    var Highlight = (function () {
        function Highlight(options) {
            this.options = options;
        }
        Highlight.prototype.beforeParse = function (ast) {
            if (this.options && this.options.beforeParse)
                ast = this.options.beforeParse(ast);
            return ast;
        };
        Highlight.prototype.highlight = function (ast, indent) {
            if (indent === void 0) { indent = 0; }
            ast = this.beforeParse(ast);
            var types = ['object', 'property', 'array', 'key', 'string', 'number', 'true', 'false', 'null'];
            if (types.indexOf(ast.type) > -1) {
                return this[("highlight_" + ast.type)](ast, indent);
            }
            return ast.value;
        };
        Highlight.prototype.highlight_object = function (ast, indent) {
            var _this = this;
            if (indent === void 0) { indent = 0; }
            var i = this.repeat(indent, ' ');
            var root = [this.tag('{', 'braces'), '', i + this.tag('}', 'braces')];
            var join = "\n";
            root[1] = ast.properties.map(function (property) { return _this.highlight(property, indent + 2); }).join(this.tag(',', 'comma') + "\n");
            if (!root[1].length) {
                join = '';
                root[2] = this.tag('}', 'braces');
            }
            return this.tag(root.join(join), ast.type);
        };
        Highlight.prototype.highlight_property = function (ast, indent) {
            if (indent === void 0) { indent = 0; }
            var i = this.repeat(indent, ' ');
            var root = [i + this.highlight(ast.key, indent), this.tag(':', 'colon') + ' ', this.highlight(ast.value, indent)];
            return this.tag(root.join(''), ast.type);
        };
        Highlight.prototype.highlight_array = function (ast, indent) {
            var _this = this;
            if (indent === void 0) { indent = 0; }
            var i = this.repeat(indent, ' ');
            var root = [this.tag('[', 'brackets'), '', i + this.tag(']', 'brackets')];
            var join = "\n";
            root[1] = ast.items.map(function (item) { return _this.repeat(indent + 2, ' ') + _this.highlight(item, indent + 2); }).join(this.tag(',', 'comma') + "\n");
            if (!root[1].length) {
                root[2] = this.tag(']', 'brackets');
                join = '';
            }
            return this.tag(root.join(join), ast.type);
        };
        Highlight.prototype.highlight_key = function (ast) {
            return this.highlight_string(ast);
        };
        Highlight.prototype.highlight_string = function (ast) {
            return this.tag("\"" + ast.value + "\"", ast.type);
        };
        Highlight.prototype.highlight_number = function (ast) {
            return this.tag(ast.value, ast.type);
        };
        Highlight.prototype.highlight_true = function (ast) {
            return this.tag('true', ast.type);
        };
        Highlight.prototype.highlight_false = function (ast) {
            return this.tag('false', ast.type);
        };
        Highlight.prototype.highlight_null = function (ast) {
            return this.tag('null', ast.type);
        };
        Highlight.prototype.tag = function (value, className) {
            return "<span class=\"json-view-" + className + "\">" + value + "</span>";
        };
        Highlight.prototype.repeat = function (repeat, string) {
            return new Array(repeat + 1).join(string);
        };
        return Highlight;
    }());
})(JSONView || (JSONView = {}));
//# sourceMappingURL=jsonView.js.map