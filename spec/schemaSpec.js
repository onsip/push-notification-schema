const Ajv = require('Ajv');
const baseSchema = require("../schemas/base.json");
const registerSchema = require("../schemas/sip/register.json");
const inviteSchema = require("../schemas/sip/invite.json");

let ajv;
let validate;
let instance;

describe('notification', function () {
  describe('register', function () {
    beforeEach(() => {
      ajv = new Ajv({ allErrors: true })
      validate = ajv.addSchema(baseSchema).compile(registerSchema);

      instance = {
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
    });

    it('schema is a valid schema', () => {
      const result = ajv.validateSchema(baseSchema) &&
        ajv.validateSchema(registerSchema);
      expect(result).toBe(true);
    });

    it('instance should match schema exactly', () => {
      const result = validate(instance);
      expect(result).toBe(true);
    });

    it('instance should pass validation, has extra data field', () => {
      instance["data"]["extra"] = "gravy!";
      const result = validate(instance);
      expect(result).toBe(true);
    });

    it('instance should pass validation, has extra sip field', () => {
      instance["data"]["payload"]["extra"] = "gravy!";
      const result = validate(instance);
      expect(result).toBe(true);
    });

    ["aor", "type"].forEach((key) => {
      it('instance should fail validation, missing ' + key, () => {
        delete instance["data"]["sip"][key];
        const result = validate(instance);
        expect(result).toBe(false);
      });
    });

    ["method", "server"].forEach((key) => {
      it('instance should fail validation, missing ' + key, () => {
        delete instance["data"]["payload"][key];
        const result = validate(instance);
        expect(result).toBe(false);
      });
    });

    it('instance should fail validation, missing payload', () => {
      delete instance["data"]["payload"];
      const result = validate(instance);
      expect(result).toBe(false);
    });
  });

  describe('invite', () => {
    beforeEach(() => {
      ajv = new Ajv({ allErrors: true })
      validate = ajv.addSchema(baseSchema).compile(inviteSchema);

      instance = {
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
    });

    it('schema is a valid schema', () => {
      const result = ajv.validateSchema(baseSchema) &&
        ajv.validateSchema(inviteSchema);
      expect(result).toBe(true);
    });;

    it('instance should match schema exactly', () => {
      const result = validate(instance);
      expect(result).toBe(true);
    });

    it('instance should pass validation, has extra data field', () => {
      instance["data"]["extra"] = "gravy!";
      const result = validate(instance);
      expect(result).toBe(true);
    });

    it('instance should pass validation, has extra payload field', () => {
      instance["data"]["payload"]["extra"] = "gravy!";
      const result = validate(instance);
      expect(result).toBe(true);
    });

    ["aor", "type"].forEach((key) => {
      it('instance should fail validation, missing ' + key, () => {
        delete instance["data"]["sip"][key];
        const result = validate(instance);
        expect(result).toBe(false);
      });
    });

    ["method", "server", "callid", "fromtag"].forEach((key) => {
      it('instance should fail validation, missing ' + key, () => {
        delete instance["data"]["payload"][key];
        const result = validate(instance);
        expect(result).toBe(false);
      });
    });

    it('instance should fail validation, missing payload', function () {
      delete instance["data"]["payload"];
      const result = validate(instance);
      expect(result).toBe(false);
    });
  });
});

