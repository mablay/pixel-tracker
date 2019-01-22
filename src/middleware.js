const pixel = require('./pixel')
const { profile } = require('./identify')
const { register, lookup } = require('./register')

module.exports = (req, res) => {
  const { resource, client, id } = profile(req)
  const clientStr = `${id.emoji.padEnd(3)} ${client.os.name} ${client.browser.name} @ ${client.address}`

  if (req.url === '/favicon.ico') {
    console.log(`${clientStr} => GET favicon`)
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    return res.end('')
  }

  if (req.url.startsWith('/register/')) {
    return register(req, res)
  }

  if (req.url.startsWith('/token/') &&
    req.url.toLowerCase().endsWith('.png')) {
    const token = req.url.split('/')[2]
    const record = lookup(token)
    if (record) {
      console.log(`${clientStr} => ${record.symbol} ${record.message}`)
    } else {
      console.log(`${clientStr} requested unknown token: ${token}`)
    }

    return pixel(req, res)
  }

  console.log(`${clientStr} => ${req.method} ${req.url}`)

  res.writeHead(200, { 'Content-Type': 'text/plain' })

  res.end(JSON.stringify({
    resource, client
  }, null, 4))
}
