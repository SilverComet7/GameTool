import { extend } from 'umi-request';
export const request = extend({
  prefix: 'http://localhost:3000/v1',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});



export const commandRequest = async (url = '/gm/command/common/18', postData) => {
  const result = await request.post(url, { data: postData })
  console.log(result);
  return result.data[postData.serverIds[0]]

}
