import { createPool } from 'slonik'
import config from '../config'

const { createInterceptors } = require('slonik-interceptor-preset')

export default createPool(config.dbUrl, {
  interceptors: [...createInterceptors()],
})
