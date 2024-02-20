import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { isTokenPresent } from "./utils/auth";

import HomeController from "./controllers/HomeController";
import LoginController from "./controllers/LoginController";
import ApplicantViewModel from "./view-models/ApplicantViewModel";

import "./App.css";
import Layout from "./components/Layout/Layout";
import CreateAccountController from "./controllers/CreateAccountController";

function App() {
  const viewModel = new ApplicantViewModel();

  const [signedIn, setSignedIn] = useState(false);
  const [stateViewModel, setViewModel] = useState(viewModel);

  useEffect(() => {
    const updateAuthState = () => {
      const tokenExists = isTokenPresent();
      setSignedIn(tokenExists);
    };

    updateAuthState();

    const intervalId = setInterval(updateAuthState, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (signedIn)
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                element={
                  <HomeController
                    viewModel={stateViewModel}
                    logout={() => setSignedIn(false)}
                  ></HomeController>
                }
              ></Layout>
            }
          ></Route>
        </Routes>
      </Router>
    );
  else
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                element={
                  <LoginController
                    viewModel={viewModel}
                    login={() => setSignedIn(true)}
                    changeState={(viewModel) => setViewModel(viewModel)}
                  ></LoginController>
                }
              ></Layout>
            }
          ></Route>
          <Route
            path="/create-account"
            element={
              <Layout
                element={
                  <CreateAccountController
                    viewModel={viewModel}
                  ></CreateAccountController>
                }
              ></Layout>
            }
          ></Route>
        </Routes>
      </Router>
    );
}

export default App;
