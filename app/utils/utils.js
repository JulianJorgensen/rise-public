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
