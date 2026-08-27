import { Navigate, Route, Routes } from 'react-router-dom'
import { TutorialLayout } from '../components/templates/TutorialLayout'
import { LessonPage } from '../pages/LessonPage'
import { ReportingPlaygroundPage } from '../pages/ReportingPlaygroundPage'

export default function App() {
  return <TutorialLayout><Routes>
    <Route path="/" element={<Navigate to="/lesson/welcome" replace />} />
    <Route path="/lesson/:lessonId" element={<LessonPage />} />
    <Route path="/reporting" element={<ReportingPlaygroundPage />} />
    <Route path="*" element={<Navigate to="/lesson/welcome" replace />} />
  </Routes></TutorialLayout>
}
