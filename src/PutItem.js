import Put from './utils/Put';

function PutItem(TableName, data = {}, extend, meta) {
  const put = Put(TableName);
  data = Object.entries(data).reduce((a, [key, value]) => {
    if (value === '' || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)) {
      return a;
    } else {
      a[key] = value;
      return a;
    }
  }, {});
  const params = Object.assign({
    Item: data,
  }, extend);
  return put(params, meta);
}

export default PutItem;
