import {FETCH_DOCUMENTATION,} from './action.types'
import * as firebase from "firebase";

import {documentationRef} from "../../config/firebase";

export const removeDocumentation = removeDocumentationId => async dispatch => {
  documentationRef.child(removeDocumentationId).remove();
};

export const fetchDocumentation = () => async dispatch => {
  documentationRef.on("value", snapshot => {
    dispatch({
      type: FETCH_DOCUMENTATION,
      payload: snapshot.val()
    });
  });
};

export const updateDocumentation = (documentation, documentationId) => async dispatch => {
  firebase.database().ref('documentation').set(documentation);
};




