import lessons from '../lessons.json'

export type LessonData = {
  name: string
  group: string
  urlParam: string
}

const allLessonData: LessonData[] = Object.entries(lessons).map(
  (lessonData) => {
    return {
      name: lessonData[1].lessonName,
      group: lessonData[1].lessonGroup,
      urlParam: lessonData[0],
    }
  },
)

export function searchLessons(keywords: string): LessonData[] {
  return allLessonData.filter(
    (lessonData) =>
      lessonData.name.toLowerCase().includes(keywords.toLowerCase()) ||
      lessonData.group.toLowerCase().includes(keywords.toLowerCase()),
  )
}
