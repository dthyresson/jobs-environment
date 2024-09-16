import { jobs } from 'src/lib/jobs'

export const LogEnvironmentJob = jobs.createJob({
  queue: 'default',
  perform: async () => {
    jobs.logger.info('LogEnvironmentJob is performing...')
    jobs.logger.info(
      { environment: process.env.NODE_ENV },
      'The environment in the job'
    )

    if (process.env.NODE_ENV === 'production') {
      jobs.logger.info('LogEnvironmentJob is production in job')
    }

    if (process.env.NODE_ENV === 'development') {
      jobs.logger.info('LogEnvironmentJob is development in job ')
    }

    if (process.env.NODE_ENV === 'test') {
      jobs.logger.info('LogEnvironmentJob is test in job')
    }

    if (process.env.NODE_ENV === undefined) {
      jobs.logger.warn('LogEnvironmentJob is undefined in job')
    }

    jobs.logger.info('LogEnvironmentJob is done')
  },
})
