var jsonschema = require('jsonschema');
var notificationSchema = require("../schemas/base.json");

var v;
var instance;
beforeEach(function() {
  v = new jsonschema.Validator();
  instance = {
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
});

describe('notification', function() {

  it('schema is a valid schema', function() {
    function emptyValidate() {
      v.validate({}, notificationSchema);
    }
    expect(emptyValidate).not.toThrowError(jsonschema.SchemaError);
  });

  it('instance should match schema exactly', function() {
    var result = v.validate(instance, notificationSchema);
    expect(result.errors.length).toBe(0);
  });

  it('instance should pass validation, has extra data field', function() {
    instance["data"]["extra"] = "gravy!";
    var result = v.validate(instance, notificationSchema);
    expect(result.errors.length).toBe(0);
  });

  it('instance should pass validation, has extra sip field', function() {
    instance["data"]["sip"]["extra"] = "gravy!";
    var result = v.validate(instance, notificationSchema);
    expect(result.errors.length).toBe(0);
  });

  [ "aor", "fromtag", "method"].forEach(function(key) {
    it('instance should fail validation, missing ' + key, function() {
      delete instance["data"]["sip"][key];
      var result = v.validate(instance, notificationSchema);
      expect(result.errors.length > 0).toBeTruthy();
    });
  });

  it('instance should fail validation, missing sip field', function() {
    delete instance["data"]["sip"]["aor"];
    var result = v.validate(instance, notificationSchema);
    expect(result.errors.length > 0).toBeTruthy();
  });

});

