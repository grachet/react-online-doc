export const getDocIndex = (props) => {
  const {sid, id} = props.match.params;
  const {documentation} = props;
  let doc = documentation[documentation.length - 1].documentation;
  let result = {}
  doc.forEach((section, si) => {
    if (section.id === sid) {
      section.pages.map((page, pi) => {
        if (page.title === id) {
          result = {si, pi,docs:page.doc}
        }
      })
    }
  })
  return result
}
