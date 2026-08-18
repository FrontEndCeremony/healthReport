import { createBrowserRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReportDetail from '../view/reportDetail/index.tsx'

const RouteElement = () => {
  const { t } = useTranslation()
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f5f0', color: '#8b6a3e', fontSize: 20 }}>
      {t('route_instruction')}
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteElement />,
  },
  {
    path: '/reportDetail/:id',
    element: <ReportDetail />,
  },
])