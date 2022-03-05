import { BrowserRouter, Route, Routes } from "react-router-dom"
import { DragView } from "../views/DragView"
import { StatusView } from "../views/StatusView"


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DragView />} />
        <Route path='/status' element={<StatusView />} />
      </Routes>
    </BrowserRouter>
  )
}
