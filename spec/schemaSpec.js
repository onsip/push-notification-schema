const jsonschema = require('jsonschema');
const Validator = jsonschema.Validator;

let v;
let instance;

describe('notification', function() {
  describe('register', function() {

    const notificationSchema = require("../schemas/sip/register.json");
    beforeEach(() => {
      v = new Validator();
      instance = {
        "data": {
          "type": "sip.register",
          "payload": {
            "aor": "sip:grant@test.onsip.com",
          }
        }
      };
    });

    it('schema is a valid schema', () => {
      const emptyValidate = () => {
        v.validate({}, notificationSchema);
      }
      expect(emptyValidate).not.toThrowError(jsonschema.SchemaError);
    });

    it('instance should match schema exactly', () => {
      const result = v.validate(instance, notificationSchema);
      expect(result.errors.length).toBe(0);
    });

    it('instance should pass validation, has extra data field', () => {
      instance["data"]["extra"] = "gravy!";
      const result = v.validate(instance, notificationSchema);
      expect(result.errors.length).toBe(0);
    });

    it('instance should pass validation, has extra sip field', () => {
      instance["data"]["payload"]["extra"] = "gravy!";
      const result = v.validate(instance, notificationSchema);
      expect(result.errors.length).toBe(0);
    });

    ["aor"].forEach((key) => {
      it('instance should fail validation, missing ' + key, () => {
        delete instance["data"]["payload"][key];
        const result = v.validate(instance, notificationSchema);
        expect(result.errors.length > 0).toBeTruthy();
      });
    });

    it('instance should fail validation, missing payload', () => {
      delete instance["data"]["payload"];
      const result = v.validate(instance, notificationSchema);
      expect(result.errors.length > 0).toBeTruthy();
    });
  });

  describe('invite', () => {

    const notificationSchema = require("../schemas/sip/invite.json");
    beforeEach(() => {
      v = new Validator();
      instance = {
        "data": {
          "type": "sip.invite",
          "payload": {
            "aor": "sip:grant@test.onsip.com",
            "server": "edge.sip.onsip.com",
            "callid": "abc294dj349rgj"
          }
        }
      };
    });

    it('schema is a valid schema', () => {
      const emptyValidate = () => {
        v.validate({}, notificationSchema);
      };
      expect(emptyValidate).not.toThrowError(jsonschema.SchemaError);
    });

    it('instance should match schema exactly', () => {
      const result = v.validate(instance, notificationSchema);
      expect(result.errors.length).toBe(0);
    });

    it('instance should pass validation, has extra data field', () => {
      instance["data"]["extra"] = "gravy!";
      const result = v.validate(instance, notificationSchema);
      expect(result.errors.length).toBe(0);
    });

    it('instance should pass validation, has extra payload field', () => {
      instance["data"]["payload"]["extra"] = "gravy!";
      const result = v.validate(instance, notificationSchema);
      expect(result.errors.length).toBe(0);
    });

    ["aor", "server", "callid"].forEach((key) => {
      it('instance should fail validation, missing ' + key, () => {
        delete instance["data"]["payload"][key];
        const result = v.validate(instance, notificationSchema);
        expect(result.errors.length > 0).toBeTruthy();
      });
    });

    it('instance should fail validation, missing payload', function() {
      delete instance["data"]["payload"];
      const result = v.validate(instance, notificationSchema);
      expect(result.errors.length > 0).toBeTruthy();
    });
  });
});

