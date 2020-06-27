import pool from './pool'
import { sql } from 'slonik'
import log from 'loglevel'

type Int = number
type Float = number
export interface Sound {
  id: Int
  name: string
  serverId: Int
  uri?: string
  uploadDate: number
  playCount: Int
  duration: Float
}

export function insert(
  name: string,
  serverId: string,
  uri: string | null = null,
): Sound {
  log.debug(`Creating sound ${name} ${uri}`)
  return pool.query(sql`
    INSERT INTO sound (name, server_id, uri)
    VALUES (${name}, ${serverId}, ${uri})
    RETURNING *
  `) as any
}

export function byName(name: string, serverId: string): Sound | null {
  log.debug(`Querying by ${name} : ${serverId}`)
  return pool.maybeOne(sql`
    SELECT * FROM sound
    WHERE name = ${name} AND server_id = ${serverId}
  `) as any
}
