import type { PropsWithChildren } from 'react'
import { TutorialSidebar } from '../organisms/TutorialSidebar'
export function TutorialLayout({ children }: PropsWithChildren) { return <div className="app-shell"><TutorialSidebar/><main className="content">{children}</main></div> }
