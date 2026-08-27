import { createFileRoute } from '@tanstack/react-router'
import { ReportingPlaygroundPage } from '../pages/ReportingPlaygroundPage'

export const Route = createFileRoute('/reporting')({ component: ReportingPlaygroundPage })
