import { RouterProvider } from "react-router"
import {router} from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview-ai/Interview.context.jsx"
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
    <Toaster position="top-right" toastOptions={{ duration: 4000 }}/>
    <AuthProvider>
      <InterviewProvider>
      <RouterProvider router={router}/>
      </InterviewProvider>
    </AuthProvider>
    </>
   
  )
}

export default App