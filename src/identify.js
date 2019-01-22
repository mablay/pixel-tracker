const parser = require('ua-parser-js')

function profile (req) {
  const ua = parser(req.headers['user-agent'])
  return {
    resource: {
      url: req.url,
      method: req.method,
      timestamp: Date.now()
    },
    client: {
      address: req.connection.remoteAddress,
      family: req.connection.remoteFamily,
      headers: req.headers,
      ...ua
    },
    id: identify(JSON.stringify([
      req.connection.remoteAddress,
      req.connection.remoteFamily,
      req.headers['user-agent'],
      req.headers['accept-language']
    ]))
  }
}

// Weak method to pseudo-uniquely map a
// client to a number between 0 and 255
function identify (payload) {
  const hash = require('crypto').createHash('sha1').update(payload).digest('hex')
  const emojiIndex = 127744 + parseInt(hash.substr(hash.length - 2), 16)
  const emoji = String.fromCodePoint(emojiIndex)
  return { hash, emoji }
}

module.exports = {
  profile,
  identify
}
