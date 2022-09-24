import logo from './logo.svg';
import './App.css';
import NewHome from './components/NewHome';
import FirmResult from './Pages/FirmResult';
import ErrorPage from './Pages/Error';
import 'face-api.js/dist/face-api.min.js';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Header from './components/Header/Header';
const router = createBrowserRouter([
  {
    path: "/",
    element: <NewHome />,
    errorElement: <ErrorPage />

  },
  {
    path: "/firm-result",
    element: <FirmResult />,
    errorElement: <ErrorPage />

  },
]);
function App() {
  return (
    // <RouterProvider>

    <div className="App">
      <Header />
      <RouterProvider router={router} />
      {/* <header className="App-header">
        </header> */}
    </div>
  );
}

export default App;
