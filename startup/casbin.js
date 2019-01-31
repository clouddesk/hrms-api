const Enforcer = require('casbin');
const { SequelizeAdapter } = require('casbin-sequelize-adapter');

module.exports = async () => {
    const a = await SequelizeAdapter.newAdapter(
      'mysql://root:root@localhost:3306/hrms',
      true
    );
  
    const e = await Enforcer.newEnforcer('./models/rbac_model.conf', a);
  
    return e
  
  };
  