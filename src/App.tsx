import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuestionnairePage from './pages/FormPage/FormPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: <QuestionnairePage />
  }
])

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
