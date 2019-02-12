const _ = require('lodash');
const casbin = require('../startup/casbin');

exports.addGroupForUser = async (req, res) => {
  const enforcer = await casbin();
  enforcer
    .addRoleForUser('user_' + req.user.id, 'group_' + req.body.id)
    .then(() =>
      res.status(200).json(enforcer.getRolesForUser('user_' + req.user.id))
    );
};

exports.getGroupsForUser = async (req, res) => {
  const enforcer = await casbin();
  enforcer
    .getRolesForUser(req.params.id)
    .then(() =>
      res.status(200).json(enforcer.getRolesForUser('user_' + req.user.id))
    );
};

exports.removeGroupForUser = async (req, res) => {
  const enforcer = await casbin();
  enforcer
    .deleteRoleForUser('user_' + req.user.id, 'group_' + req.body.id)
    .then(() =>
      res.status(200).json(enforcer.getRolesForUser('user_' + req.user.id))
    );
};

exports.removeAllGroupsForUser = async (req, res) => {
  const enforcer = await casbin();
  enforcer
    .deleteRolesForUser('user_' + req.user.id)
    .then(() =>
      res.status(200).json(enforcer.getRolesForUser('user_' + req.user.id))
    );
};

exports.addPermissionForGroup = async (req, res) => {
  const enforcer = await casbin();
  enforcer
    .addPermissionForUser(
      'group_' + req.params.id,
      req.body.object,
      req.body.permission
    )
    .then(() => res.json(enforcer.getPermissionsForUser(req.body.id)));
};

exports.getPermissionsForGroup = async (req, res) => {
  const enforcer = await casbin();
  const permissions = await enforcer.getPermissionsForUser(
    'group_' + req.params.id
  );
  if (!permissions) {
    return res
      .status(404)
      .json(`Permission with ID ${req.params.id} doesn't exist`);
  }
  if (req.headers.getallpermissions === 'yes') {
    res.json(permissions);
  } else if (req.query.term === 'undefined') {
    res.json(permissions);
  } else {
    const newData = []
    permissions.forEach(data => {
      if (data[1] && data[1].indexOf(req.query.term) !== -1) {
        newData.push(data);
      }
    });
    res.json(newData);
  }
};

exports.removePermissionForGroup = async (req, res) => {
  const enforcer = await casbin();
  enforcer
    .deletePermissionForUser(
      req.params.id,
      req.query.sysObject,
      req.query.permission
    )
    .then(() => res.json(enforcer.deletePermissionForUser(req.body.id)));
};

exports.removeAllPermissionsForGroup = async (req, res) => {
  const enforcer = await casbin();
  enforcer
    .deletePermissionsForUser('group_' + req.body.id)
    .then(() => res.json(enforcer.deletePermissionsForUser(req.body.id)));
};
