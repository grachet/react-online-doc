import {FETCH_DOCUMENTATION,} from './action.types'
import * as firebase from "firebase";

import {documentationRef} from "../../config/firebase";

export const removeDocumentation = () => async dispatch => {
  documentationRef.remove();
};

export const fetchDocumentation = () => async dispatch => {
  documentationRef.on("value", snapshot => {
    dispatch({
      type: FETCH_DOCUMENTATION,
      payload: snapshot.val()
    });
  });
};

export const updateDocumentation = (docs) => async (dispatch, getState) => {
  const {user, documentation} = getState();

  let newDoc = [...documentation, {
    creationTimestamp: new Date().getTime(),
    owner: user.displayName,
    documentation: docs
  }]

  firebase.database().ref('documentation').set(newDoc);
};





