import ytdl from 'ytdl-core'
import { Message } from 'discord.js'
import log from 'loglevel'
import { createReadStream, promises as fs } from 'fs'
import { withConn } from '../../util/voice'
import axios from 'axios'
import { Converter } from 'ffmpeg-stream'
import { Readable } from 'stream'

export function playYoutube(msg: Message): void {
  withConn(msg, conn => {
    log.debug(`playing ${msg.content} from youtube`)
    conn.play(ytdl(msg.content, { filter: 'audioonly' })).setVolume(0.1)
  })
}

export async function playHttp(msg: Message): Promise<void> {
  withConn(msg, conn => {
    log.debug(`playing ${msg.content} from http`)

    // conn.play('https://raw.githubusercontent.com/AnthonyP4312/brave-bot/master/soundFiles/boipussi.ogg', {
    //   type: "ogg/opus"
    // })
    //   .on('error', console.error)
    //   .setVolume(1)


    conn.play(msg.content)
      .on('error', console.error)
      .setVolume(1)
  })
}

export async function playLocal(msg: Message): Promise<void> {
  const file = msg.content + '.ogg'
  // The absolute fucking state of node development when i have to
  // catch an error to just see if a file exists jesus christ give
  // me a bool you monsters
  try {
    // Check that the sound exists first
    const filepath = `/sounds/${file}`
    await fs.stat(filepath)

    withConn(msg, conn => {
      log.debug(`playing local file ${filepath}`)
      // conn.play(createReadStream(filepath), {
      //   type: 'ogg/opus',
      // })
      console.log('speaking', conn.speaking)
      conn.play(filepath).on('error', console.error)
      console.log('speaking', conn.speaking)
    })
  } catch (e) {
    if (e.code === 'ENOENT')
      msg.reply(`Couldn't find that file: ${msg.content}`)
    else console.error(e)
  }
}

///

const converter = new Converter()
const input = converter.createOutputStream({f: 's16le'})



// const foo = ffmpeg('https://raw.githubusercontent.com/AnthonyP4312/brave-bot/master/soundFiles/boipussi.ogg')
