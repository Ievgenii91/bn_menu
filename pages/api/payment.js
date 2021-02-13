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
  const { amount, description } = JSON.parse(req.body);
  const host = req.headers.origin;
  const data = {
      version: '3',
      amount: amount,
      public_key: PUBLIC_KEY,
      private_key: PRIVATE_KEY,
      action: 'pay',
      currency: 'UAH',
      language: 'uk',
      description,
      result_url: host + '/done',
      server_url: host + '/api/done',
      order_id: new Date().getTime() + ''
  }

  try {
    res.status(200).json(getHashes(data))
  } catch (e) {
    console.error(e);
    res.end();
  }
}

