import { isYoutube, isHttp } from './uriValidate'
import { playYoutube, playLocal, playHttp } from './handlers'
import { Message } from 'discord.js'
/**
 * Given a URI attempt to play the sound correctly
 *
 * Should support:
 *   - files over http
 *   - local files (probably not though)
 *   - youtube links
 */
export default function(msg: Message, params: string) {
  if (isYoutube(params)) return playYoutube(msg, params)
  if (isHttp(params)) return playHttp(msg, params)

  playLocal(msg, params)
}
