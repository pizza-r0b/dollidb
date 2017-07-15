import AWS from 'aws-sdk';

let docClient;

export default (config) => {
  if (docClient) {
    return docClient;
  } else {
    AWS.config.update({
      region: 'us-east-1',
      ...config,
    });
    return docClient = new AWS.DynamoDB.DocumentClient();
  }
};
