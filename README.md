# README

Demonstrate that the environment is not correctly set in the job worker.

Knowing that the environment is correctly set the job will let a developer use different storage adapters per environment. For example, in the `development` environment, the job will use the `file` storage adapter, but in the `production` environment, the job will use the `s3` storage adapter.

## Steps to reproduce

1. Run `yarn dev`
2. Start the jobs by running `yarn jobs work`
2. Open the browser and navigate to `http://localhost:8910/graphql`
3. Run the following query:

```graphql
query TestJobsEnvironment {
  logEnvironment
}
```

Can see that the environment is correctly set in the service to `development` when `yarn rw dev` is running.

```bash
api | 11:51:33 🐛 Processing GraphQL Parameters
api | 11:51:33 🐛 graphql-server GraphQL execution started: TestJobsEnvironment
api | 11:51:33 🌲 The environment in the service
api | 🗒 Custom
api | {
api |   "environment": "development"
api | }
api | 11:51:33 🌲 LogEnvironmentJob [RedwoodJob] Scheduling LogEnvironmentJob
api | 🗒 Custom
api | {
api |   "path": "LogEnvironmentJob/LogEnvironmentJob",
api |   "args": [],
api |   "runAt": "2024-09-15T15:51:33.280Z",
api |   "queue": "default",
api |   "priority": 50
api | }
api | 11:51:33 🐛 graphql-server GraphQL execution completed: TestJobsEnvironment
api | 11:51:33 🐛 Processing GraphQL Parameters done.
```

However, when the jobs are running, the environment is undefined.

```bash
api | 11:52:03 🐛 Processing GraphQL Parameters
11:51:32 🐛 [rw-jobs-worker.*.0] Checking for jobs in all (*) queues...
11:51:32 🌲 [RedwoodJob] Started job 8 (LogEnvironmentJob/LogEnvironmentJob:LogEnvironmentJob)
11:51:32 🌲 LogEnvironmentJob is performing...
11:51:32 🌲 The environment in the service
11:51:32 🚦  LogEnvironmentJob is undefined
11:51:32 🌲 LogEnvironmentJob is done
11:51:32 🐛 [RedwoodJob] Job 8 success
```

However, if you run the jobs with  NODE_ENV=development yarn rw jobs work` the environment is correctly set to `development`.

```bash
11:53:51 🐛 [rw-jobs-worker.*.0] Checking for jobs in all (*) queues...
11:53:51 🌲 [RedwoodJob] Started job 10 (LogEnvironmentJob/LogEnvironmentJob:LogEnvironmentJob)
11:53:51 🌲 LogEnvironmentJob is performing...
🗒 Custom
{
  "environment": "development"
}
11:53:51 🌲 LogEnvironmentJob is development
11:53:51 🌲 LogEnvironmentJob is done
11:53:51 🐛 [RedwoodJob] Job 10 success
11:53:51 🐛 [rw-jobs-worker.*.0] Checking for jobs in all (*) queues...
```

> Note:
>
> There is checking in the jobs cli commands for the environment to add the logger formatter, but that must > have a different way of getting the environment.
