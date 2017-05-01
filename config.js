const m = {};
module.exports = m;

// Server config
m.server = {};
m.server.hostname = 'http://chipserver.ml';
m.server.port = 26231;

// JWT config
m.jwt = {};
m.jwt.secret = 'theUltimateSecret';
m.jwt.options = {
    algorithm: 'HS256',
    expiresIn: 3600,
    issuer: 'Chipserver',
};

m.paths = ['/auth'];
