import GetData from '../utils/GetData';

const TABLE = 'UserData-archadon-dev';

const test = async () => {
  let data;

  try {
    data = await GetData(TABLE, 'a66aba20-1a8e-11e7-8ce7-69114e514f27');
  } catch (e) {
    throw new Error(e);
  }
  console.log('DATA', data);
};

test();

// describe('GetData', () => {
//   it('should return the correct data with a single path', async () => {
//     const data = await GetData(TABLE, 'a66aba20-1a8e-11e7-8ce7-69114e514f27', ['Address']);
//     console.log(data);
//   })
// })
