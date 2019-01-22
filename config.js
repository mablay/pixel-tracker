const config = {
  port: process.env.OPENSHIFT_NODEJS_PORT || 8000,
  host: '0.0.0.0' // require('os').hostname() // process.env.OPENSHIFT_NODEJS_IP ||
}

module.exports = config
