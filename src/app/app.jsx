import { useSelector } from 'react-redux';
import { BrowserRouter, useHistory } from 'react-router-dom';
import Routes from './routes';
import './app.styles.scss';
import MenuBar from '../components/menuBar';
import AppBar from '../components/appBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const history = useHistory();

  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter basename={process.env.REACT_APP_PATH} history={history}>
      <div className="Container">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          pauseOnHover={true}
          hideProgressBar={true}
          closeOnClick={false}
          closeButton={true}
        />
        {user?.access_token ? <MenuBar /> : null}
        <div className="wrapper">
          {user?.access_token ? <AppBar /> : null} <Routes />
          {/* {user?.access_token ? (
            <>
              <Divider />
              <footer className="footer">
                Copyright ©IntelMe 2021 • Privacy Policy • Our Website • Contact
                Us
              </footer>
            </>
          ) : null} */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
