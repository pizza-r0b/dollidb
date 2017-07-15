import docClient from 'utils/docClient';

/**
 *
 * @param {*} TableName - Name of table to perform query upon
 * @param {*} PathArray - Object[ [ItemID, Path], ... ] - Array of ItemID/Path arrays
 */
function DeleteData(TableName, PathArray) {
  if (!TableName) {
    throw new Error('Required parameter TableName is missing.');
  }
  if (!PathArray) {
    throw new Error('Required parameter PathArray is missing');
  } else if (!Array.isArray(PathArray)) {
    throw new Error('PathArray must be an array [ [ItemId, Path], ... ]');
  }

  const params = {
    RequestItems: {
      [TableName]: [],
    },
  };

  PathArray.forEach(([ItemID, Path]) => {
    params.RequestItems[TableName].push({
      DeleteRequest: {
        Key: {
          ItemID, Path,
        },
      },
    });
  });

  return new Promise((resolve, reject) => {
    docClient.batchWrite(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export default DeleteData;
