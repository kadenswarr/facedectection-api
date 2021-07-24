const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'de7e42d5900c4b149afa9e51347567d3'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("api failed"))
}

const handleImage = (req, res, knex) => {
  const { id } = req.body;
  knex('users').where('id','=',id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json("unable to get entries"))
}

module.exports = {
  handleImage,
  handleApiCall
}
