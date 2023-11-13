import fetchFileContent from './FileFetcher'

/*
 * @brief fetches content from the ofast-team content repository
 *     wraps the `fetchFileContent` method
 * @param lessonPath: path to the file containing the lesson content
 *     relative to the root of the repository
 * @returns the content of the file as a promised string
 */
async function fetchLessonContent(lessonPath: string): Promise<string> {
  return fetchFileContent('ofast-team', 'content', lessonPath)
}

export default fetchLessonContent
