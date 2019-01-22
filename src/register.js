const { identify } = require('./identify')
const tokens = {}

function register (req, res) {
  const msg = req.url.substr(10)
  const token = identify(msg)
  tokens[token.hash] = {
    message: msg,
    symbol: token.emoji
  }
  const tokenList = Object.keys(tokens).map(hash => (`
<div>
  <a class="hash" href="/token/${hash}/pixel.png">${hash}</a>
  ${tokens[hash].symbol}
  ${tokens[hash].message}
</div>
`))
  res.writeHead(200, { 'Content-Type': 'text/html' })
  return res.end(`
<html>
  <head>
    <meta charset="utf-8">
    <style>.hash { font-family: monospace; }</style>
  </head>
  <body>
    <h1>Tokens</h1>
    ${tokenList.join('\n')}
  </body>
</html>
`)
}

function lookup (token) {
  return tokens[token]
}

module.exports = {
  register,
  lookup
}
