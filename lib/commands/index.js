module.exports = {
  'access': 'manage user access',
  'access:grant': require('./access/grant'),
  'access:list': require('./access/list'),
  'access:revoke': require('./access/revoke'),

  'annotations': 'manage stream annotations',
  'annotations:delete': require('./annotations/delete'),
  'annotations:write': require('./annotations/write'),
  'annotations:read': require('./annotations/read'),

  'db': 'manage databases',
  'db:create': require('./db/create'),
  'db:delete': require('./db/delete'),
  'db:export': require('./db/export'),
  'db:list': require('./db/list'),
  'db:rename': require('./db/rename'),

  'events': 'manage events',
  'events:append': require('./events/append'),
  'events:delete': require('./events/delete'),
  'events:read': require('./events/read'),
  'events:watch': require('./events/watch'),

  'help': 'display help',

  'ns': 'manage namespaces',
  'ns:rename': require('./ns/rename'),
  'ns:list': require('./ns/list'),

  'server': 'manage connection to Persistr Server',
  'server:cloud': require('./server/cloud'),
  'server:url': require('./server/url'),
  'server:show': require('./server/show'),

  'streams': 'manage event streams',
  'streams:delete': require('./streams/delete'),
  'streams:list': require('./streams/list'),

  'user': 'login/logout and manage users',
  'user:activate': require('./user/activate'),
  'user:create': require('./user/create'),
  'user:deactivate': require('./user/deactivate'),
  'user:delete': require('./user/delete'),
  'user:list': require('./user/list'),
  'user:login': require('./user/login'),
  'user:logout': require('./user/logout'),
  'user:whoami': require('./user/whoami'),
}
