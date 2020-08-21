import * as config from '../config';

export var fullCredential:any = {
    "id": "https://www.validatedid.com/es/vidchain/credentials/educational-credential-va",
    "type": [
      "VerifiableCredential",
      "EuropassCredential"
    ],
    "issuer": {
      "id": config.DID,
      "organization": {
        "id": config.DID,
        "legalIdentifier": "ESB90243601",
        "vatIdentifier": "ESB90243601",
        "identifier": "agentIdentifier1",
        "preferredName": "Jobs Site",
        "alternativeName": "Jobs Site",
        "homePage": "https://www.validatedid.com/es/vidchain/"
      }
    },
    "title": [
      {
        "lang": "en_GB",
        "contentType": "text/plain",
        "text": "Software Developer at Validated ID"
      },
      {
        "lang": "es_ES",
        "contentType": "text/plain",
        "text": "Programador en Validated ID"
      }
    ],
    "description": [
      {
        "lang": "en_GB",
        "contentType": "text/plain",
        "text": "Attests that Tula is a Software Developer at Validated ID."
      },
      {
        "lang": "es_ES",
        "contentType": "text/plain",
        "text": "Confirmación de que Tula es un Programador en Validated id"
      }
    ],
    "credentialSubject": {
      "id": "",
      "learningActivity": {
        "id": "jobs-site-c4de/laa1",
        "identifier": "laaIdentifier1",
        "title": "Software Developer at Validated ID",
        "description": "Develop a SSI solution.",
        "startedAtTime": "",
        "endedAtTime": "",
        "hasPart": []
      },
      "learningSpecification": {
        "id": "jobs-site-c4de/lss1",
        "identifier": {
          "IdentifierSchemeAgencyName": "Jobs Site",
          "Content": "20090702132843917605"
        },
        "title": "Software Developer",
        "volumeOfLearning": "40 hours",
        "learningOutcomes": [ ],
        "partialQualification": false
      }
    }
};


