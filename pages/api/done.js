const crypto = require('crypto');
const { PUBLIC_KEY, PRIVATE_KEY } = process.env;

const str_to_sign = function (str) {
  const sha1 = crypto.createHash('sha1');
  sha1.update(str);
  return sha1.digest('base64');
};

const getHashes = (config) => {  
  let data = Buffer.from(JSON.stringify(config)).toString('base64');
  let signature = str_to_sign(PRIVATE_KEY + data + PRIVATE_KEY);
  return {
    data,
    signature
  }
};

export default async function handler(req, res) {
  console.log(req.body, req.params, req.query, 'DONE');

  res.redirect(200, '/done');
}

