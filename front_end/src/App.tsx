import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import HomeController from "./controllers/HomeController";
import LoginController from "./controllers/LoginController";
import ApplicantModel from "./models/ApplicantModel";
import ApplicantViewModel from "./view-models/ApplicantViewModel";

function App() {
  const model = new ApplicantModel();
  const viewModel = new ApplicantViewModel(model);

  const [signedIn, setSignedIn] = useState(false);

  if (signedIn)
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <HomeController
                viewModel={viewModel}
                logout={() => setSignedIn(false)}
              ></HomeController>
            }
          ></Route>
        </Routes>
      </Router>
    );
  else
    return (
      <LoginController
        viewModel={viewModel}
        login={() => setSignedIn(true)}
      ></LoginController>
    );
}

export default App;
