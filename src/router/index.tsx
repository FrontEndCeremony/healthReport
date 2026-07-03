import { createBrowserRouter } from 'react-router-dom'

import ReportDetail from '../view/reportDetail/index.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f5f0', color: '#8b6a3e', fontSize: 20 }}>
        请通过 /report/:id 访问指定报告
      </div>
    ),
  },
  {
    path: '/reportDetail/:id',
    element: <ReportDetail />,
  },
])