import { Link } from '@tanstack/react-router'
import { CodeBlock } from '../components/atoms/CodeBlock'
import { ExportAction } from '../components/molecules/ExportAction'
import { lessons } from '../features/lessons/lessonContent'
import { allUsersWorkbook, basicWorkbook, styledWorkbook, tableWorkbook } from '../features/reporting/excel'
import { fetchUsers } from '../features/reporting/api'

export function LessonPage({ lessonId }: { lessonId: string }) {
  const index = lessons.findIndex((lesson) => lesson.id === lessonId)
  const lesson = lessons[index]

  const exportLesson = async () => {
    if (lesson.download === 'basic') return basicWorkbook()
    if (lesson.download === 'styled') return styledWorkbook()
    const users = await fetchUsers()
    if (lesson.download === 'table') return tableWorkbook(users)
    if (lesson.download === 'chart') return allUsersWorkbook(users)
  }

  return <article className="lesson">
    <p className="eyebrow">{lesson.eyebrow}</p>
    <h1>{lesson.title}</h1>
    <p className="lead">{lesson.description}</p>
    <section className="lesson-card">
      <div className="card-heading"><h2>Try it yourself</h2>{lesson.download && <ExportAction label={lesson.downloadLabel ?? 'Download example .xlsx'} onExport={exportLesson}/>}</div>
      <CodeBlock code={lesson.code}/>
      {lesson.note && <p className="note">{lesson.note}</p>}
    </section>
    {lesson.examples && <section className="lesson-examples"><h2>Implementation examples</h2><div className="example-grid">{lesson.examples.map((example, exampleIndex) => <article className="example-card" key={example.title}><span>{String(exampleIndex + 1).padStart(2, '0')}</span><h3>{example.title}</h3><p>{example.description}</p><CodeBlock code={example.code}/></article>)}</div></section>}
    {lesson.id === 'welcome' && <Link className="button" to="/reporting">Open the reporting project →</Link>}
    <footer className="step-footer">{index > 0 ? <Link to="/lesson/$lessonId" params={{lessonId:lessons[index-1].id}}>← {lessons[index-1].title}</Link> : <span/>}{index < lessons.length-1 ? <Link to="/lesson/$lessonId" params={{lessonId:lessons[index+1].id}}>{lessons[index+1].title} →</Link> : <Link to="/reporting">Open project →</Link>}</footer>
  </article>
}
