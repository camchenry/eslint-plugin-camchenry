// @ts-check
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  create(context) {
    return {
      VariableDeclaration(node) {
        if (node.declarations.length !== 1) {
          return;
        }
        const declaration = node.declarations[0];
        if (declaration.type !== "VariableDeclarator") {
          return;
        }
        if (declaration.id.type !== "Identifier") {
          return;
        }
        if (declaration.init?.type !== "CallExpression") {
          return;
        }
        if (declaration.init.callee.type !== "Identifier") {
          return;
        }
        if (declaration.init.callee.name !== "useMemo") {
          return;
        }
        if (declaration.init.arguments.length !== 2) {
          return;
        }
        const [firstArgument, secondArgument] = declaration.init.arguments;
        if (firstArgument.type !== "ArrowFunctionExpression") {
          return;
        }
        if (secondArgument.type !== "ArrayExpression") {
          return;
        }
        if (secondArgument.elements.length !== 0) {
          return;
        }
        if (firstArgument.body.type !== "ObjectExpression") {
          return;
        }
        if (firstArgument.body.properties.length !== 1) {
          return;
        }
        const [property] = firstArgument.body.properties;
        if (property.type !== "Property") {
          return;
        }
        if (property.key.type !== "Identifier") {
          return;
        }
        context.report({
          node,
          message: "Avoid useMemo with no dependencies, prefer extracting",
        });
      },
    };
  },
};
