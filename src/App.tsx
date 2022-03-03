import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import { DragView } from './views/DragView';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
      <DragView />
      </DndProvider>
    </div>
  );
}

export default App;
