import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/lesson/$lessonId', params: { lessonId: 'welcome' }, replace: true })
  },
})
