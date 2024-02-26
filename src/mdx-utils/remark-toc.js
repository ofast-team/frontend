import GithubSlugger from 'github-slugger'

export default ({ tableOfContents }) => {
  const slugger = new GithubSlugger()

  function process(node) {
    if (node.type === 'heading') {
      const val = {
        depth: node.depth,
        value: node.children[0].value,
        slug: slugger.slug(node.children[0].value, false),
      }
      tableOfContents.push(val)
    }

    for (let child of node.children || []) {
      process(child)
    }
  }

  return (node) => {
    process(node)
  }
}
