import fetch from 'node-fetch';
import { TMsgAttrs } from '../types';

const slackWebhookUrl = 'SLACK_WEBHOOK_URL_PLACEHOLDER';

export const processEventsToNotify = async (utProps: TMsgAttrs) => {
  try {
    let text = '';
    switch (utProps.eventName) {
      case 'NEW_USER_SIGNUP': {
        text = `\`\`\`\nevent_name: ${utProps.eventName}\nemail_id: ${utProps.emailId}\norg_status: ${utProps.orgStatus}\n\`\`\``;
        await notifySlack(slackWebhookUrl, text);
        break;
      } 

      case 'EBOOK_DOWNLOAD': {
        text = `\`\`\`\nevent_name: ${utProps.eventName}\nfirst_name: ${utProps.firstName}\nemail_id: ${utProps.emailId}\n\`\`\``;
        await notifySlack(slackWebhookUrl, text);
        break;
      }
    
      default:
        break;
    } 
  } catch (error) {
    console.log(error);
    // sentry error
  }
};

const formatProps = (text: string) => {
  return {
    blocks: [
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': text,
        },
      },
    ],
  };
};

const notifySlack = async (url: string, text: string) => {
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formatProps(text)),
  });
  if (resp.ok) {
    return;
  } else {
    // raise a sentry error
  }
};
  