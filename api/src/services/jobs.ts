import { LogEnvironmentJob } from 'src/jobs/LogEnvironmentJob/LogEnvironmentJob'
import { later } from 'src/lib/jobs'
import { logger } from 'src/lib/logger'
export const logEnvironment = () => {
  logger.info(
    { environment: process.env.NODE_ENV },
    'The environment in the service'
  )

  later(LogEnvironmentJob)

  return true
}
