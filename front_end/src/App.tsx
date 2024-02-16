import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

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
