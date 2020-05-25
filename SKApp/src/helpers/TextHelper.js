function removeAccent(val) {
  return val.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function elasticIndexOf(val, inSrc) {
  var inSrc = removeAccent(inSrc).toLowerCase();
  var val = removeAccent(val).toLowerCase();
  return inSrc.indexOf(val);
}

export default {
  removeAccent,
  elasticIndexOf
};
