import { isYoutube } from './uriValidate'
import { playYoutube } from './handlers'
import { Message } from 'discord.js'
/**
 * Given a URI attempt to play the sound correctly
 *
 * Should support:
 *   - files over http
 *   - local files (probably not though)
 *   - youtube links
 */
export default function(msg: Message) {
  if (isYoutube(msg.content)) return playYoutube(msg)
}
