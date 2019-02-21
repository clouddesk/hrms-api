const Enforcer = require('casbin');
const { SequelizeAdapter } = require('casbin-sequelize-adapter');
const config = require('config');

module.exports = async () => {
  const db = config.get('db_name');
  const db_acc = config.get('db_acc');
  const db_secret = config.get('db_secret');
  const db_host = config.get('db_host');
  const db_port = config.get('db_port');
  const a = await SequelizeAdapter.newAdapter(
    `mysql://${db_acc}:${db_secret}@${db_host}:${db_port}/${db}`,
    true
  );

  const e = await Enforcer.newEnforcer('./models/rbac_model.conf', a);

  return e;
};
