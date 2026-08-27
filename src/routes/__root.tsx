import { createRootRoute, Navigate, Outlet } from '@tanstack/react-router'
import { TutorialLayout } from '../components/templates/TutorialLayout'

export const Route = createRootRoute({
  component: () => <TutorialLayout><Outlet /></TutorialLayout>,
  notFoundComponent: () => <Navigate to="/lesson/$lessonId" params={{ lessonId: 'welcome' }} replace />,
})
