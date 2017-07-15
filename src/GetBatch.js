import docClient from './utils/docClient';

function GetBatch(table, idArr) {
  return new Promise((resolve, reject) => {
    const params = {
      RequestItems: {
        [table]: {
          Keys: idArr.map(ID => ({ ID })),
        },
      },
    };

    docClient.batchGet(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

export default GetBatch;
