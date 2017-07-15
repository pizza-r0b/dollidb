import docClient from './utils/docClient';

function GetItem(tableName, attribute, value, extend) {
  const params = {
    TableName: tableName,
    KeyConditionExpression: '#A = :value',
    ExpressionAttributeNames: {
      '#A': attribute,
    },
    ExpressionAttributeValues: {
      ':value': value,
    },
    ...extend,
  };

  return new Promise((resolve, reject) => {
    docClient.query(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      const Items = data.Items || [];
      let item = null;
      if (Items.length) {
        item = Items[0];
      }
      return resolve(item);
    });
  });
}

export default GetItem;
