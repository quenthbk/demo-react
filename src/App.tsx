import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <AppRouter />
      </DndProvider>
    </div>
  );
}

export default App;
