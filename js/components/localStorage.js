export function setLocal(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Save Error in LocalStorage:', error);
  }
}
export function getLocal(key) {
  try {
    const jsonValue = localStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : {};
  } catch (error) {
    console.error('Reading Error from LocalStorage:', error);
    return null;
  }
}
export function loadUserSettings(key, lokal) {
  let userLocal = getLocal(key);

  if (userLocal) {
    for (let key in userLocal) {
      if (lokal.hasOwnProperty(key)) {
        lokal[key] = userLocal[key];
      } else {
        lokal[key] = userLocal[key] || [];
      }
    }
  }
}
