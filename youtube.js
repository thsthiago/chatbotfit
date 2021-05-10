const Youtube = require('youtube-node')
const ytConfig = require('./yt-config.json')

const youtube = new Youtube()

youtube.setKey(ytConfig.key)

const searchVideo = (message, queryText) => {
  return new Promise((resolve,reject) => {
    youtube.search(`Exercicio em casa para biceps ${queryText}`, 2, (err, res) => {
      if(!err) {
        const videoIds = res.items.map((item) => item.id.videoId).filter(item => item)
        const youtubeLinks = videoIds.map(videoId => `https://youtube.com/watch?v=${videoId}`)
        resolve(`${message} ${youtubeLinks.join(', ')}`)
      } else {
        reject()
      }
    })
  })
}

module.exports.searchVideo = searchVideo