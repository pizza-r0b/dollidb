import docClient from './utils/docClient';
import toPaths from './utils/toPaths';
import { isObject } from './utils';
import GetData from './GetData';

function CheckForData(tableName, hashKey, hashKeyVal, pathPrefix) {
  return new Promise(async (resolve) => {
    const data = await GetData(tableName, hashKeyVal, pathPrefix);
    const paths = toPaths(data);
    resolve(paths);
  });
}

function returnGroups(TableName, data, processFn) {
  const dataGroups = [];
  const MAX = 25;
  for (let i = 0; i < data.length; i += MAX) {
    const group = data.slice(i, i + MAX);
    dataGroups.push(processFn ? processFn(group) : group);
  }
  return dataGroups;
}

async function PutData(TableName, key, data, meta) {
  const keyName = key[0];
  const keyValue = key[1];

  if (isObject(data)) {
    data = toPaths(data);
  } else if (!Array.isArray(data)) {
    throw new Error(`Expected data to be Array or Object instead got ${data}`);
  }

  const dataGroups = returnGroups(TableName, data);

  dataGroups.forEach((group, i) => {
    dataGroups[i] = group.map(([path, val]) => ({
      PutRequest: {
        Item: {
          [keyName]: keyValue,
          Path: path,
          Value: val,
        },
      },
    }));
  });

  const deleteRequests = [];

  for (let e = 0; e < dataGroups; e++) {
    const group = dataGroups[e];
    for (let i = 0; i < group.length; i++) {
      const item = group[i];
      const [path, value] = item;
      if (value === '<<EmptyArray>>') {
        const dataToDelete = await CheckForData(TableName, keyName, keyValue, path); //eslint-disable-line
        dataToDelete.forEach(([pathKey]) => {
          deleteRequests.push({
            DeleteRequest: {
              Key: {
                [keyName]: keyValue,
                Path: pathKey,
              },
            },
          });
        });
        deleteRequests.push({
          DeleteRequest: {
            Key: {
              [keyName]: keyValue,
              Path: path,
            },
          },
        });
        continue; // eslint-disable-line
      }
    }
  }

  dataGroups.push(...returnGroups(TableName, deleteRequests));

  return Promise.all(dataGroups.map(items => new Promise((resolve, reject) => {
    docClient.batchWrite({
      RequestItems: {
        [TableName]: items,
      },
    }, (err, res) => {
      if (err) {
        reject({ err, dataGroups });
      } else {
        resolve({ data: res, meta });
      }
    });
  })));
}

export default PutData;
