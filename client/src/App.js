import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";
import Home from "./pages/home";
import Login from "./pages/login";
import Forgot from "./pages/forgotpassword";
import Register from "./pages/register";
import Alert from "./components/alert/Alert";
import Header from "./components/Header";
import StatusModal from "./components/StatusModal";
import MainHeader from "./components/MainHeader";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Section from "./components/Section";
import { useSelector, useDispatch } from "react-redux";
import { getDetails, refreshToken } from "./redux/actions/auth";
import SidebarStudent from "./components/SidebarStudent";
import SidebarSchool from "./components/SidebarSchool";
import { getPosts } from "./redux/actions/post";
import io from "socket.io-client";
import SocketClient from "./SocketClient";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SiderBarRight from "./components/SiderBarRight";
import SidebarStudentRight from "./components/SidebarStudentRight";
import Student from "./components/Student";
import { getNotifies } from "./redux/actions/notify";
import Resetpassword from "./pages/resetpassword/[id]";
import Packages from './pages/packages'
import Confirmemail from "./components/confirmemail";
import Token from "./components/confirmtoken";
import Particles from 'react-particles-js';
import particlesConfig from "./config/particle-config";

function App() {
  const { auth, status } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);
  useEffect(() => {
    dispatch(getDetails(auth));
    return () => {};
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  return (
    <Router>
 
      <Alert />
      {status && <StatusModal />}

      <Switch>
        <Route path="/resetpassword/:id" component={Resetpassword} exact />

        <Route
          path="/profile/:id"
          component={auth.user !== undefined ? Student : null}
          exact
        />
        <Route
              path="/confirmtoken/:id"
              component={Token}
              exact
            />


        <div className="d-flex" id="wrapper">
          {auth.token ? (
            auth.user.role === "student" ? (
              <SidebarStudent />
            ) : (
              <SidebarSchool />
            )
          ) : null}
          {auth.token && <SocketClient />}
          <div id="page-content-wrapper">
            {auth.token ? <MainHeader /> : <Header />}

            <Route path="/" component={auth.token ? Home : Section} exact />
            <Route path="/login" component={auth.token ? Home : Login} exact />
            <Route
              path="/register"
              component={auth.token ? Home : Register}
              exact
            />
            <Route
              path="/confirmemail"
              component={auth.token ? Home : Confirmemail}
              exact
            />
            
            <Route
              path="/forgotpassword"
              component={auth.token ? Home : Forgot}
              exact
            />

            <div className="container-fluid">
              <Route path="/search/:id" component={Search} exact />
              <PrivateRouter path="/:page" component={PageRender} exact />
              <PrivateRouter path="/:page/:id" component={PageRender} exact />
            </div>
          </div>
        </div>
      </Switch>
      <Footer />
   
    </Router>
  );
}

export default App;
