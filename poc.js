#!/usr/bin/env node

const Ajv = require('Ajv');
const request = require("request-promise");

const baseSchema = require("./schemas/base.json");

function loadSchema(uri) {
  return request(uri).then(response => {
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error(`Failed to parse: ${response} Error is ${error}`);
    }
  }).catch(err => {
    console.error("Fetching from uri: " + uri + " failed with: " + err);
  });
}

const runRegisterAsync = () => {
  const ajv = new Ajv({ allErrors: true, loadSchema: loadSchema });
  const uri = "https://raw.githubusercontent.com/onsip/push-notification-schema/master/schemas/sip/register.json";

  const instance = {
    "data": {
      "sip": {
        "aor": "sip:grant@test.onsip.com",
        "type": "sip.register",
      },
      "payload": {
        "method": "REGISTER",
        "server": "edge.sip.onsip.com",
      }
    }
  };
  ajv.compileAsync({
    $ref: uri
  }).then(function (validate) {
    var valid = validate(instance);
    console.log("Async Register push is valid: " + valid);
    if (!valid) {
      validate.errors.forEach(error => {
        console.log(error);
      });
    }
  });
};

const runInviteAsync = () => {
  const ajv = new Ajv({ allErrors: true, loadSchema: loadSchema });
  const uri = "https://raw.githubusercontent.com/onsip/push-notification-schema/master/schemas/sip/invite.json";

  const instance = {
    "data": {
      "sip": {
        "type": "sip.invite",
        "aor": "sip:grant@test.onsip.com",
      },
      "payload": {
        "method": "INVITE",
        "server": "edge.sip.onsip.com",
        "callid": "abc294dj349rgj",
        "fromtag": "abc294dj349rgj"
      }
    }
  };

  ajv.compileAsync({
    $ref: uri
  }).then(function (validate) {
    var valid = validate(instance);
    console.log("Async Invite push is valid: " + valid);
    if (!valid) {
      validate.errors.forEach(error => {
        console.log(error);
      });
    }
  });
};

const runInviteSync = () => {
  const ajv = new Ajv({ allErrors: true });

  const inviteSchema = require("./schemas/sip/invite.json");

  const instance = {
    "data": {
      "sip": {
        "type": "sip.invite",
        "aor": "sip:grant@test.onsip.com",
      },
      "payload": {
        "method": "INVITE",
        "server": "edge.sip.onsip.com",
        "callid": "abc294dj349rgj",
        "fromtag": "abc294dj349rgj"
      }
    }
  };
  var validate = ajv.addSchema(baseSchema).compile(inviteSchema);
  var valid = validate(instance);
  console.log("Synchronous Invite push is valid: " + valid);
  if (!valid) {
    validate.errors.forEach(error => {
      console.log(error);
    });
  }
};

const runRegisterSync = () => {
  const ajv = new Ajv({ allErrors: true });
  const registerSchema = require("./schemas/sip/register.json");

  const instance = {
    "data": {
      "sip": {
        "aor": "sip:grant@test.onsip.com",
        "type": "sip.register",
      },
      "payload": {
        "method": "REGISTER",
        "server": "edge.sip.onsip.com",
      }
    }
  };

  var validate = ajv.addSchema(baseSchema).compile(registerSchema);
  var valid = validate(instance);
  console.log("Synchronous Register push is valid: " + valid);
  if (!valid) {
    validate.errors.forEach(error => {
      console.log(error);
    });
  }
};

runRegisterAsync();
runRegisterSync();
runInviteAsync();
runInviteSync();
