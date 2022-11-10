module.exports = {
  root: true,
  env: {
    node: true
  },
  extends:[<% if (eslint === "persagy") { %>
    'plugin:@persagy2/level2'
  <% }else{ %>
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  <% } %>],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: <% if (eslint === "persagy") { %>{} <% }else{ %>{
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }<% } %>
}
