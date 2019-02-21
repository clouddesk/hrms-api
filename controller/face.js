const request = require('request');
const config = require('config');

const getHeader = contentType => {
  if (contentType) {
    return {
      'Content-Type': contentType,
      'Ocp-Apim-Subscription-Key': config.get('azureFaceApiKey')
    };
  } else {
    return {
      'Ocp-Apim-Subscription-Key': config.get('azureFaceApiKey')
    };
  }
};

const baseURL = config.get('MSCSfaceAPI_base');
const personDetectURL = config.get('MSCSfaceAPI_base') + '/detect';
const personVerifyURL = config.get('MSCSfaceAPI_base') + '/verify';
const personGroupsURL = baseURL + '/persongroups/';
const personGroupPersonURL = personGroupId => {
  return personGroupsURL + personGroupId + '/persons/';
};
const personFaceURL = (personGroupId, personId) => {
  return personGroupPersonURL(personGroupId) + personId + '/persistedFaces/';
};

/** Create a new person group with specified personGroupId, name, and user-provided userData
 */
exports.createPersonGroup = async (req, res) => {
  url = personGroupsURL + req.body.personGroupId;
  request.put(
    url,
    {
      json: { name: req.body.personGroupName },
      headers: getHeader()
    },
    (error, response, body) => {
      if (error) res.json(error);
    }
  );
};

/** Update existing person group
 */
exports.updatePersonGroup = async (req, res) => {
  url = personGroupsURL + req.params.id;
  request.patch(
    url,
    {
      json: { name: req.body.personGroupName },
      headers: getHeader()
    },
    (error, response, body) => {
      if (error) res.json(error);
    }
  );
};

/** Delete an existing person group with specified personGroupId
 */
exports.deletePersonGroup = async (req, res) => {
  url = personGroupsURL + req.params.id;
  request.delete(url, (error, response, body) => {
    if (error) res.status(400).json(error);
  });
};

/** List person groups’s pesonGroupId, name, and userData.
 */
exports.listPersonGroup = async (req, res) => {
  url = personGroupsURL;
  request.get(url, { headers: getHeader() }, (error, response, body) => {
    if (error) res.json(error);
    if (body) res.json(body);
  });
};

/**
 * Retrieve person group name
 */
exports.getPersonGroup = async (req, res) => {
  url = personGroupsURL + req.params.id;
  request.get(url, { headers: getHeader() }, (error, response, body) => {
    if (error) res.json(error);
    if (body) res.json(body);
  });
};

/** Create a new person in a specified person group
 */
exports.addPersonToPersonGroup = async (req, res) => {
  url = personGroupPersonURL(req.body.personGroupId);
  request.post(
    url,
    {
      json: { name: req.body.personName },
      headers: getHeader()
    },
    (error, response, body) => {
      if (error) res.json(error);
      if (body) res.json(body);
    }
  );
};

/** Delete an existing person from a person group
 */
exports.deletePersonFromPersonGroup = async (req, res) => {
  url = personGroupPersonURL(req.query.personGroupId) + req.query.personId;
  request.delete(
    url,
    {
      headers: getHeader()
    },
    (error, response, body) => {
      if (error) res.json(error);
    }
  );
};

/** List all persons’ information in the specified person group
 */
exports.getPersonsFromPersonGroup = async (req, res) => {
  url = personGroupPersonURL(req.body.personGroupId);
  request.get(
    url,
    {
      headers: getHeader()
    },
    (error, response, body) => {
      if (error) res.json(error);
      if (body) res.json(body);
    }
  );
};

/** Retrieve a person's name and userData, and the persisted faceIds representing the registered person face image.
 */
exports.getPersonFromPersonGroup = async (req, res) => {
  url = personGroupPersonURL(req.body.personGroupId) + req.params.id;
  request.get(
    url,
    {
      headers: getHeader()
    },
    (error, response, body) => {
      if (error) res.json(error);
      if (body) res.json(body);
    }
  );
};

/** Update name or userData of a person.
 */
exports.updatePersonOfPersonGroup = async (req, res) => {
  url = personGroupPersonURL(req.body.personGroupId) + req.params.id;
  request.patch(
    url,
    {
      json: { name: req.body.personName },
      headers: getHeader()
    },
    (error, response, body) => {
      if (error) res.json(error);
    }
  );
};

/** Add a face image to a person into a person group for face identification or verification
 */
exports.addPersistedFace = async (req, res) => {
  console.log(req.query);
  url = personFaceURL(req.query.personGroupId, req.query.personId);
  console.log(url);
  request.post(
    url,
    {
      body: req.file.buffer,
      headers: getHeader('application/octet-stream')
    },
    (error, response, body) => {
      if (error) res.json(error);
      if (body) {
        body = JSON.parse(body);
        res.json(body);
        console.log(body);
      }
    }
  );
};

/** Retrieve person face information. The persisted person face is specified by its personGroupId, personId and persistedFaceId.
 */
exports.getPersistedFace = async (req, res) => {
  url =
    personFaceURL(req.body.personGroupId, req.body.personId) + req.params.id;
  request.get(
    url,
    {
      headers: getHeader()
    },
    (error, response, body) => {
      if (error) res.json(error);
      if (body) res.json(body);
    }
  );
};

/** Delete a face from a person in a person group.
 */
exports.deletePersistedFace = async (req, res) => {
  url =
    personFaceURL(req.body.personGroupId, req.body.personId) + req.params.id;
  request.delete(
    url,
    {
      headers: getHeader()
    },
    (error, response, body) => {
      if (error) res.json(error);
    }
  );
};

/** Detect human faces in an image, return face rectangles, and optionally with faceIds, landmarks, and attributes.
 */
exports.detectPerson = async (req, res) => {
  url = personDetectURL;
  request.post(
    url,
    {
      body: req.file.buffer,
      headers: getHeader('application/octet-stream')
    },
    (error, response, body) => {
      if (error) res.json(error);
      if (body) {
        faceId = JSON.parse(body);
        if (faceId.length > 0) {
          faceId = faceId[0].faceId;
          res.json(faceId);
        }
      }
    }
  );
};

/** Verify whether two faces belong to a same person or whether one face belongs to a person.
 */
exports.verifyPerson = async (req, res) => {
  url = personVerifyURL;
  console.log(req.body);
  request.post(
    url,
    {
      json: {
        faceId: req.body.faceId,
        personGroupId: req.body.personGroupId,
        personId: req.body.personId
      },
      headers: getHeader()
    },
    (error, response, body) => {
      if (error) res.json(error);
      if (body) res.json(body);
    }
  );
};
