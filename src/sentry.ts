import {init, captureCheckIn} from '@sentry/node';

const DSN_KEY_JOBS = 'SENTRY_DSN_PLACEHOLDER';

export const sentryInitialize = () => {
  init({
    dsn: DSN_KEY_JOBS,
    environment: process.env.APP_ENV,
    tracesSampleRate: 1.0,
  });
};

export const sentrySuccess = (checkInId: string, jobName: string) => {
  captureCheckIn({
    checkInId,
    monitorSlug: jobName,
    status: 'ok',
  });
};

export const sentryProgress = (jobName: string) => {
  const checkInId = captureCheckIn({
    monitorSlug: jobName,
    status: 'in_progress',
  });
  return checkInId;
};