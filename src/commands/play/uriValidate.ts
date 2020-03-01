import log from 'loglevel'

export function isYoutube(uri: string) {
  if (uri.includes('www.youtube.com')) return true
  // add more youtube patterns here

  return false
}

export function isHttp(uri: string) {
  if (uri.startsWith('http')) {
    // TODO this is hacky and bad lol
    // const fileExtension = uri.substring(uri.length - 3)
    // log.debug(`found file extension ${fileExtension}`)
    // return validFileTypes.includes(fileExtension)
    return true
  }
}

// const validFileTypes = ['wav', 'ogg', 'mp3', 'mp4', 'avi']
