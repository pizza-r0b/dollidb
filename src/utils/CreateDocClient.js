import AWS from 'aws-sdk';

export default (config) => {
  AWS.config.update({
    region: 'us-east-1',
    ...config,
  });
  return new AWS.DynamoDB.DocumentClient();
};
