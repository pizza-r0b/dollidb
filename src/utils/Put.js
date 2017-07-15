import docClient from './docClient';

const putItem = TableName => (params, meta) => new Promise((resolve, reject) => {
  const query = Object.assign({ TableName }, params);
  docClient.put(query, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve({
        data,
        meta,
      });
    }
  });
});

export default putItem;
