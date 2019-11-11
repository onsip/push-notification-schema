#!/usr/bin/env node

const Ajv = require('Ajv');
const request = require("request-promise");

const ajv = new Ajv({ allErrors: true, loadSchema: loadSchema });

function loadSchema(uri) {
  return request(uri).then(response => {
    return JSON.parse(response);
  }).catch(err => {
    console.error("Fetching from uri: " + uri + " failed with: " + err);
  });
}

const runRegister = () => {
  const uri = "https://raw.githubusercontent.com/onsip/push-notification-schema/dev-kevin-test/schemas/sip/register.json";

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
    console.log("Register push is valid: " + valid);
    if (!valid) {
      validate.errors.forEach(error => {
        console.log(error);
      });
    }
  });
};

const runInvite = () => {
  const uri = "https://raw.githubusercontent.com/onsip/push-notification-schema/dev-kevin-test/schemas/sip/invite.json";

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
    console.log("Invite push is valid: " + valid);
    if (!valid) {
      validate.errors.forEach(error => {
        console.log(error);
      });
    }
  });
};

runRegister();
runInvite();
