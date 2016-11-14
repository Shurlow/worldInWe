export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    console.log('HTTP OK', response)
    return response
  } else {
    var error = new Error(response.statusText)
    console.log('HTTP ERR', response)
    error.response = response
    throw error
  }
}

export function parseJSON(response) {
  return response.json()
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4();
}

export function randomBgImg() {
  var id = Math.floor(Math.random() * 6 + 1)
  return `https://s3.amazonaws.com/wiw-background/${id}.jpg`
}

export function withLS(cb) {
  if (typeof Storage !== "undefined") { return true }
  return false
}