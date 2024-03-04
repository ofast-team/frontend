import { remark } from 'remark'
import remarkToc from './remark-toc'

export type TOCHeader = {
  depth: number
  value: string
  slug: string
  filenameWithoutExt: string
}

export default async function (text: string) {
  const tableOfContents: TOCHeader[] = []
  await remark().use(remarkToc, { tableOfContents }).process(text)

  return tableOfContents
}
