import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import HomeController from "./controllers/HomeController";
import LoginController from "./controllers/LoginController";
import ViewModel from "./view-models/ViewModel";

import "./App.css";
import Layout from "./components/Layout/Layout";
import CreateAccountController from "./controllers/CreateAccountController";
import ListApplicationsController from "./controllers/ListApplicationsController";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [viewModel, setViewModel] = useState(new ViewModel());

  viewModel.setChangeAuthState((state) => setSignedIn(state));
  viewModel.setChangeState((model) => setViewModel(model));

  if (signedIn && viewModel.getRole() === 2)
    // Applicant
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                signedIn={true}
                isApplicant={true}
                element={
                  <HomeController viewModel={viewModel}></HomeController>
                }
              ></Layout>
            }
          ></Route>
        </Routes>
      </Router>
    );
  else if (signedIn && viewModel.getRole() === 1)
    // Recruiter
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                signedIn={true}
                isApplicant={false}
                element={
                  <HomeController viewModel={viewModel}></HomeController>
                }
              ></Layout>
            }
          ></Route>
          <Route
            path="/list-applications"
            element={
              <Layout
                signedIn={true}
                isApplicant={false}
                element={
                  <ListApplicationsController
                    viewModel={viewModel}
                  ></ListApplicationsController>
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
                signedIn={false}
                isApplicant={false}
                element={
                  <LoginController viewModel={viewModel}></LoginController>
                }
              ></Layout>
            }
          ></Route>
          <Route
            path="/create-account"
            element={
              <Layout
                signedIn={false}
                isApplicant={false}
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
