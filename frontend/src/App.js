import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'

import { router } from './routers'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="page">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  )
}

export default App
