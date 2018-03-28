#!/usr/bin/env node

const Validator = require('jsonschema').Validator;

const runRegister = () => {
  const eventSchema = require("./schemas/sip/register.json");
  const v = new Validator();

  const instance = {
    "data": {
      "type": "sip.register",
      "payload": {
        "aor": "sip:grant@test.onsip.com"
      }
    }
  };

  console.log(v.validate(instance, eventSchema));
};

const runInvite = () => {
  const eventSchema = require("./schemas/sip/invite.json");
  const v = new Validator();

  const instance = {
    "data": {
      "type": "sip.invite",
      "payload": {
        "aor": "sip:grant@test.onsip.com",
        "server": "edge.sip.onsip.com",
        "callid": "abc294dj349rgj"
      }
    }
  };

  console.log(v.validate(instance, eventSchema));
};

runRegister();
runInvite();
