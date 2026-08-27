/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, redirect } from '@tanstack/react-router'
import { lessons } from '../features/lessons/lessonContent'
import { LessonPage } from '../pages/LessonPage'

export const Route = createFileRoute('/lesson/$lessonId')({
  beforeLoad: ({ params }) => {
    if (!lessons.some((lesson) => lesson.id === params.lessonId)) {
      throw redirect({ to: '/lesson/$lessonId', params: { lessonId: 'welcome' }, replace: true })
    }
  },
  component: LessonRoute,
})

function LessonRoute() {
  const { lessonId } = Route.useParams()
  return <LessonPage lessonId={lessonId} />
}
