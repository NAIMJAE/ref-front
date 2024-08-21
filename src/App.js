import './App.css';
import { RouterProvider } from 'react-router-dom';
import root from './router/root';
import './styles/layout.scss'
import './styles/modal.scss'

function App() {
  return (
    <div className="App">
      <RouterProvider router={root} />
    </div>
  );
}

export default App;
