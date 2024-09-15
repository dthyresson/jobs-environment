import { jobs } from 'src/lib/jobs'

export const LogEnvironmentJob = jobs.createJob({
  queue: 'default',
  perform: async () => {
    jobs.logger.info('LogEnvironmentJob is performing...')
    jobs.logger.info(
      { environment: process.env.NODE_ENV },
      'The environment in the service'
    )

    if (process.env.NODE_ENV === 'production') {
      jobs.logger.info('LogEnvironmentJob is production')
    }

    if (process.env.NODE_ENV === 'development') {
      jobs.logger.info('LogEnvironmentJob is development')
    }

    if (process.env.NODE_ENV === 'test') {
      jobs.logger.info('LogEnvironmentJob is test')
    }

    if (process.env.NODE_ENV === undefined) {
      jobs.logger.warn('LogEnvironmentJob is undefined')
    }

    jobs.logger.info('LogEnvironmentJob is done')
  },
})
