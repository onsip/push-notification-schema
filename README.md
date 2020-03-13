# OnSIP Push Notifications Schema

This repository contains JSON Schemas to which each push notification conforms.

There are some basic coding examples in JavaScript using it's respective JSON Schema library.

## Generic Push Type
Below is the boilerplate for a generic event. It would pass validation on base.json.
```json
{
  "data": {
    "sip": {
      "aor": "My_AOR",
      "type": "sip.generic"
    },
    "payload": {
      "method": "GENERIC"
    }
  }
```

## Events with a `payload`
All pushes will contain at a minimum the fields specified by the generic push above. All pushes will need to provide the AOR this push is for and the type of push it is. Optionally we can add more to the "payload" field, which is a nested object. The expected fields of the payload are defined in the schema for the corresponding type.


### REGISTER EXAMPLE
```json
{
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
  }
```
### INVITE EXAMPLE
```json
{
    "data": {
      "sip": {
        "aor": "sip:grant@test.onsip.com",
        "type": "sip.invite",
      },
      "payload": {
        "method": "INVITE",
        "server": "edge.sip.onsip.com",
        "callid": "abc294dj349rgj",
        "fromtag": "abc294dj349rgj"
      }
    }
}
```
## Testing
To test that a schema works as intended:
```npm test```

`poc.js` can also be used and it shows how to load the schemas both locally or asynchronous from an external source.