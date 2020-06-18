import * as config from '../config';

export var fullCredential:any = {
    "id": "https://www.validatedid.com/es/vidchain/credentials/educational-credential-va",
    "type": [
      "VerifiableCredential",
      "EuropassCredential"
    ],
    "issuer": {
      //"id": config.DID,
      "organization": {
        //"id": config.DID,
        "legalIdentifier": "ESB90243601",
        "vatIdentifier": "ESB90243601",
        "identifier": "agentIdentifier1",
        "preferredName": "University of Barcelona",
        "alternativeName": "University of Barcelona",
        "homePage": "https://www.validatedid.com/es/vidchain/"
      }
    },
    "title": [
      {
        "lang": "en_GB",
        "contentType": "text/plain",
        "text": "Degree in Software Engineering"
      },
      {
        "lang": "es_ES",
        "contentType": "text/plain",
        "text": "Grado en Ingenieria Informatica"
      }
    ],
    "description": [
      {
        "lang": "en_GB",
        "contentType": "text/plain",
        "text": "Attests that Tula has completed the degree in Software Engineering."
      },
      {
        "lang": "es_ES",
        "contentType": "text/plain",
        "text": "Confirmación de que Tula ha completado el grado en Ingenieria Informatica"
      }
    ],
    "credentialSubject": {
      "id": "",
      "learningActivity": {
        "id": "university-barcelona-c4de/laa1",
        "identifier": "laaIdentifier1",
        "title": "Degree in Software Engineering",
        "description": "The bachelor degree in Software Engineering provides the knowledge needed to conceive, design, develop, maintain and manage computer systems, services, applications and architectures and to understand and apply relevant legislation. You will also become an expert in new methods and technologies in the field of ICTs.",
        "startedAtTime": "2020-01-01T19:73:24Z",
        "endedAtTime": "",
        "hasPart": []
      },
      "learningSpecification": {
        "id": "university-barcelona-c4de/lss1",
        "identifier": {
          "IdentifierSchemeAgencyName": "University Of Barcelona",
          "Content": "20090702132843917605"
        },
        "title": "Degree in Software Engineering",
        "volumeOfLearning": "246 ETCS",
        "learningOutcomes": [ ],
        "partialQualification": false
      }
    }
};

