import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ViewModel from "./view-models/ViewModel";

import Layout from "./components/Layout/Layout";

import HomeController from "./controllers/HomeController";
import ListApplicationsController from "./controllers/ListApplicationsController";
import LoginController from "./controllers/LoginController";
import CreateAccountController from "./controllers/CreateAccountController";

import "./App.css";

/**
 * The main component of the application responsible for rendering different routes
 * based on the user's authentication status and role.
 *
 * @returns The main application component.
 */
function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [viewModel, setViewModel] = useState(new ViewModel());

  viewModel.setChangeAuthState((state) => setSignedIn(state));
  viewModel.setChangeState((model) => setViewModel(model));

  const onLogout = () => {
    viewModel.logout();
    window.location.replace("/");
  };

  if (signedIn && viewModel.getRole() === 2 || viewModel.getRole() === null/**Applicant */)
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
                onLogout={onLogout}
              ></Layout>
            }
          ></Route>
        </Routes>
      </Router>
    );
  else if (signedIn && viewModel.getRole() === 1 /**Recruiter */)
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
                onLogout={onLogout}
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
                onLogout={onLogout}
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
            path="/*"
            element={
              <Layout
                signedIn={false}
                isApplicant={false}
                element={
                  <LoginController viewModel={viewModel}></LoginController>
                }
                onLogout={onLogout}
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
                onLogout={onLogout}
              ></Layout>
            }
          ></Route>
        </Routes>
      </Router>
    );
}

export default App;
