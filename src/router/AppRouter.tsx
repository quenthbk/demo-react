import { BrowserRouter, Route, Routes } from "react-router-dom"
import { DragView } from "../views/DragView"
import { PictureView } from "../views/PictureView"
import { StatusView } from "../views/StatusView"

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PictureView />} />
        <Route path='/status' element={<StatusView />} />
      </Routes>
    </BrowserRouter>
  )
}
