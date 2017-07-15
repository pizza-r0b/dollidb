import docClient from './utils/docClient';
import fromPaths from './utils/fromPaths';

const ITEM_ID_VALUE_ALIAS = ':idvalue';
const PATH_VALUE_ALIAS = ':pvalue';
const PATH_KEY_ALIAS = '#P';
const ID_KEY_ALIAS = '#I';

/**
 * QueryItem will query a table
 */
function QueryItem(tableName, itemID, path) {
  let pathCondition = '';
  const ExpressionAttributeValues = {
    [ITEM_ID_VALUE_ALIAS]: itemID,
  };

  const ExpressionAttributeNames = {
    [ID_KEY_ALIAS]: 'ItemID',
  };

  if (path) {
    pathCondition = ` AND begins_with(${PATH_KEY_ALIAS}, ${PATH_VALUE_ALIAS})`;
    ExpressionAttributeValues[PATH_VALUE_ALIAS] = path;
    ExpressionAttributeNames[PATH_KEY_ALIAS] = 'Path';
  }

  const params = {
    TableName: tableName,
    KeyConditionExpression: `${ID_KEY_ALIAS} = ${ITEM_ID_VALUE_ALIAS}${pathCondition}`,
    ExpressionAttributeValues,
    ExpressionAttributeNames,
  };

  return new Promise((resolve, reject) => {
    docClient.query(params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const Items = data.Items || [];

      const parsedData = fromPaths(
        Items.reduce((a, b) => {
          a.push([b.Path, b.Value]);
          return a;
        }, [])
      );

      return resolve(parsedData);
    });
  });
}

/**
 * The GetData function returns data from a specified path. If no path is specified
 * all data correlating with specified ItemID in specified Table will be returned .
 *
 * @param {string} tableName - Name of dynamoDB table that you want to get data from
 * @param {string | number} itemID - The ItemID to for the item(s) to get
 * @param {string} paths - A string representing the path containing the data you want to get
 *
 * @returns {Object}
 */

function GetData(tableName, itemID, path) {
  if (tableName === void 0) {
    throw new Error('tableName is missing in GetData');
  }
  if (itemID === void 0) {
    throw new Error('itemID is missing in GetData');
  }

  if (path && typeof path !== 'string') {
    throw new Error(`Expected paths to be a string but got ${typeof paths}`);
  }

  return QueryItem(...arguments); // eslint-disable-line
}

export default GetData;
