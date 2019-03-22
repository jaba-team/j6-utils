// router utils
export function getLink(link) {

  var origin = window && window.location && window.location.origin;
  if (link) {
    link = link.replace(origin, '');
    let linkLower = link.toLowerCase();
    if (link.indexOf('/') === 0) {
      // internal link
      if (isStaticFile(linkLower)) return null;
      return { url: link, internal: true };
    } else {
      if (link.indexOf('http') !== 0) {
        link = 'http://' + link;
      }
      return { url: link, internal: false };
    }
  }
  return null;
}

var exts = ['.pdf', '.jpg', '.png', '.docx']
function isStaticFile(path) {
  for(let i = 0; i < exts.length; i++) {
    if (path.indexOf(exts[i]) >= 0) return true;
  }
  return false;
}
