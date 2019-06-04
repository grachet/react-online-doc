export const getDocIndex = (props) => {
  const {sid, id} = props.match.params;
  const {documentation} = props;
  if (!documentation) return {};
  let docs = documentation[documentation.length - 1].documentation;
  let result = {docs}
  docs.forEach((section, si) => {
    if (section.titleSection === sid) {
      section.pages && section.pages.map((page, pi) => {
        if (page.title === id) {
          result = {docs, si, pi, doc: page.doc || []}
        }
      })
    }
  })
  return result
}


export const getConcatArrayAttribute = (arrayObject, attribute) => {
  let array = [];
  for (let ao of arrayObject) {
    for (let item of ao[attribute]) {
      array.push(item)
    }
  }
  return array
}

export const flattenArray = (array) => {
  return Object.values(flattenObject(array));
}


export const flattenObject = (ob) => {
  let toReturn = {};
  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if ((typeof ob[i]) === 'object') {
      let flatObject = flattenObject(ob[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};
