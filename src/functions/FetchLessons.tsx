import fetchFileContent from './FileFetcher'
import ReadingBlock from '../components/ReadingBlock'
import MCQBlock from '../components/MCQBlock'
import FITBBlock from '../components/FITBBlock'
import React from 'react'

interface LessonComponent {
  filename: string
  type: 'reading' | 'mcq' | 'fitb'
}

/*
 * @brief gets all of the lessons and returns the react components associated with each Lesson
 */

// TODO(cam): refactor this to get the entire repository with octokit using a single call
async function fetchLessons() {
  const lessonDirs = JSON.parse(
    await fetchFileContent('ofast-team', 'content', 'lessons.json'),
  ) as Array<string>

  const lessonsArray = await Promise.all(
    lessonDirs.map(async (dir) => {
      const lessonComponents = JSON.parse(
        await fetchFileContent('ofast-team', 'content', `${dir}/lesson.json`),
      ) as Array<LessonComponent>

      const reactComponents = await Promise.all(
        lessonComponents.map(async ({ filename, type }) => {
          const contents = await fetchFileContent(
            'ofast-team',
            'content',
            `${dir}/${filename}`,
          )

          if (type === 'reading') {
            return <ReadingBlock content={contents} />
          } else {
            const content = JSON.parse(contents)
            if (type === 'mcq') {
              return <MCQBlock {...content} />
            } else {
              return <FITBBlock {...content} />
            }
          }
        }),
      )

      return { lessonName: dir, reactComponents }
    }),
  )

  const lessonsObject: Record<string, Array<JSX.Element>> = {}

  lessonsArray.forEach(({ lessonName, reactComponents }) => {
    lessonsObject[lessonName] = reactComponents
  })

  return lessonsObject
}

export default fetchLessons
