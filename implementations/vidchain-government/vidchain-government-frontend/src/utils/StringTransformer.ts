/**
 * Auxiliar function to replace in the DID, to use ethr
 */
function replaceDID(did:string) {
    var didReplaced = did;
    if (did !== undefined) {
      didReplaced = did.replace("ebsi","ethr");
    }
  
    return didReplaced;
  }

  export {
    replaceDID
  };
  