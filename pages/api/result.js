export default async function handler(req, res) {
  if(req.body) {
    
    res.redirect('../done');
  } else {
    res.send({ status: 'no redirect' })
  }  
};
