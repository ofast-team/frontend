import fetchFileContent from './FileFetcher'

async function fetchLessonContent(lessonPath: string): Promise<string> {
  return fetchFileContent('ofast-team', 'content', lessonPath)
}

export default fetchLessonContent
