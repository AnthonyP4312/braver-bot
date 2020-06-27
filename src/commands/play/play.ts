import { isYoutube, isHttp } from './uriValidate'
import { playYoutube, playLocal, playHttp } from './handlers'
import { Message } from 'discord.js'
import { byName } from '../../db/Sound'

/**
 * Given a URI attempt to play the sound correctly
 *
 * Should support:
 *   - files over http
 *   - local files (probably not though)
 *   - youtube links
 */
export default async function play(msg: Message, givenUri: string) {
  if (!msg.guild?.id) return

  // Check if this is a stored sound
  const sound = await byName(givenUri, msg.guild?.id)
  const uri = sound?.uri || givenUri

  if (isYoutube(uri)) return playYoutube(msg, uri)
  if (isHttp(uri)) return playHttp(msg, uri)

  playLocal(msg, uri)
}
