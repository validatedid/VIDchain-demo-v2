import * as config from '../config';
import * as externals from '../api/externals';

async function resolveDidDoc(did: string) {
  const didUrlResolver = config.DID_URI_RESOLVER;
  const doc = await externals.get(`${didUrlResolver}/${did}`);
  return doc.data;
}

async function getKid(did: string): Promise<string> {
  const didDoc = await resolveDidDoc(did);
  return didDoc.verificationMethod[0].id;
}

export {getKid, resolveDidDoc};
