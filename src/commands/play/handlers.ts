import ytdl from 'ytdl-core'
import { Message } from 'discord.js'
import log from 'loglevel'
import { promises as fs } from 'fs'
import { withConn } from '../../util/voice'

const defaultConfig = {
  fec: true,
  highWaterMark: 1 << 25,
}

export function playYoutube(msg: Message, params: string): void {
  withConn(msg, conn => {
    log.debug(`playing ${params} from youtube`)
    conn
      .play(
        ytdl(params, {
          filter: 'audioonly',
          ...defaultConfig,
        }),
      )
      .setVolume(0.1)
  })
}

export async function playHttp(msg: Message, url: string): Promise<void> {
  withConn(msg, conn => {
    log.debug(`playing ${url} from http`)
    conn
      .play(url, defaultConfig)
      .on('error', console.error)
      .on('end', console.log)
      .setVolume(1)
  })
}

export async function playLocal(msg: Message, params: string): Promise<void> {
  const file = params + '.ogg'
  // The absolute fucking state of node development when i have to
  // catch an error to just see if a file exists jesus christ give
  // me a bool you monsters
  try {
    // Check that the sound exists first
    const filepath = `/sounds/${file}`
    await fs.stat(filepath)

    withConn(msg, conn => {
      log.debug(`playing local file ${filepath}`)
      conn.play(filepath, defaultConfig).on('error', console.error)
    })
  } catch (e) {
    if (e.code === 'ENOENT') msg.reply(`Couldn't find that file: ${file}`)
    else console.error(e)
  }
}
