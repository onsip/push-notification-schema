#!/usr/bin/env node

const Validator = require('jsonschema').Validator;

function run() {
  const eventSchema = require("./schemas/base.json");
  const v = new Validator();

  const instance = {
    "data": {
        "sip": {
            "aor": "sip:grant@wubs.onsip.com",
            "callid": "\"Grant\" <grant@wubs.onsip.com>",
            "fromtag": "...",
            "method": "...", // "INVITE" or "REGISTER" (documented) - see about enum
            "uri": "..." // deprecated
        }
    }
  };

  console.log(v.validate(instance, eventSchema));
}

run();
