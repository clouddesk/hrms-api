const _ = require("lodash");
const { Subscriber, validate } = require("../models/subscriber");

exports.subscribe = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let subscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    isSubscribed: true
  });
  await subscriber.save();

  res.send(subscriber);
};

exports.unsubscribe = async (req, res) => {
  const { error } = validateUnsubscribeRequest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let subscriber = await Subscriber.FindAll({
    where: { email: req.body.email }
  });
  if (!subscriber || subscriber.email !== req.user.email)
    return res.status(404).send(`We are unable to unsubscribe you...`);
  subscriber = await Subscriber.update(
    {
      isSubscribed: false
    },
    { where: { email: req.params.email } }
  );
  res.status(200).send(subscriber);
};

exports.getAllSubscribers = async (req, res) => {
  res.send(
    await Subscriber.findAll({
      attributes: [
        "id",
        "name",
        "email",
        "isSubscribed",
        "createdAt",
        "updatedAt"
      ]
    })
  );
};

function validateUnsubscribeRequest(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email()
  };

  return Joi.validateUnsubscribeRequest(req, schema);
}
