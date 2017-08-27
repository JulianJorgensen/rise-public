import _ from 'lodash';
import { reduxFirebase as rfConfig } from 'app/config';

export function updateAccount(firebase, uid, newData) {
  return firebase.update(`${rfConfig.userProfile}/${uid}`, newData).then((res) => {
  }).catch((err) => {
    console.error('Error updating account', err);
  });
}

export function toObject(arr) {
  let object = {};
  arr.map((item) => {
    object[item[0]] = item[1];
  })
  return object;
}

export function isMentor(role) {
  if (role.name === 'mentor' || role.name === 'admin') {
    return true;
  }
  return false;
}

export function isAdmin(role) {
  if (role.name === 'admin') {
    return true;
  }
  return false;
}

export function removePopulatedData(data) {
  let filteredData = Object.entries(data).filter(([key, value]) => {
    return typeof value !== 'object' && typeof value !== 'undefined';
  });
  return toObject(filteredData);
}
