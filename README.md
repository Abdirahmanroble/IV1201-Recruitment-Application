# Getting Started with IV1201 Recruitment Application

This guide will walk you through setting up and running the IV1201 Recruitment Application on your local development machine.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- Docker (for containerization)
- Git (for version control)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Abdirahmanroble/IV1201-Recruitment-Application.git
    cd IV1201-Recruitment-Application
    ```

2. **Set up the backend:**

    Navigate to the backend directory:

    ```bash
    cd back_end
    ```

    Install the necessary npm packages:

    ```bash
    npm install
    ```

    Start the backend server:

    ```bash
    npm start
    ```

    The server should now be running on `http://localhost:3000`.

3. **Set up the database:**

    Ensure Docker is running, then use Docker Compose to set up the database:

    ```bash
    docker-compose up -d
    ```

    Run the initial database scripts to create the necessary tables and populate them with data:

    ```bash
    npm run initdb
    ```

4. **Set up the frontend:**

    Open a new terminal and navigate to the frontend directory:

    ```bash
    cd ../front_end
    ```

    Install the necessary npm packages:

    ```bash
    npm install
    ```

    Start the Vite development server:

    ```bash
    npm run dev
    ```

    The application should now be running and accessible at `http://localhost:4000`.

## Usage

With both the backend server and the frontend development server running, open your web browser and go to `http://localhost:4000` to view and interact with the application.

## Contributing

If you wish to contribute to the project, please fork the repository and create a pull request with your features or changes.

## Support

For any additional help or clarification, please open an issue on the GitHub repository, and a maintainer will assist you.




# Project Structure
```
 IV1201-Recruitment-Application
├── .github
├── back_end
│ ├── src
│ │ ├── controller
│ │ │ ├── loginController.ts
│ │ │ └── userController.ts
│ │ ├── errors
│ │ │ └── errorHandler.ts
│ │ ├── integration
│ │ │ └── dbConfig.ts
│ │ ├── middleware
│ │ │ └── authMiddleware.ts
│ │ ├── model
│ │ │ ├── application.ts
│ │ │ ├── availability.ts
│ │ │ ├── competence.ts
│ │ │ ├── competenceProfile.ts
│ │ │ ├── role.ts
│ │ │ └── user.ts
│ │ ├── routes
│ │ │ ├── listApplicationRoute.ts
│ │ │ └── userRoutes.ts
│ │ ├── services
│ │ │ ├── applicationService.ts
│ │ │ ├── authService.ts
│ │ │ └── hashPasswords.ts
│ │ ├── util
│ │ │ ├── Logger.ts
│ │ │ ├── Validators.ts
│ │ │ ├── index.ts
│ │ │ └── setupAssociations.ts
│ │ └── index.ts
│ ├── initdb
│ ├── node_modules (ignored by git)
│ ├── dist (ignored by git)
│ ├── Dockerfile
│ ├── package.json
│ ├── package-lock.json (ignored by git)
│ ├── tsconfig.json
│ ├── .eslintrc.yml
│ └── .gitignore
│
├── front_end
│ ├── node_modules (ignored by git)
│ ├── public
│ ├── src
│ │ ├── ctypes
│ │ │ ├── CreateAccount.tsx
│ │ │ ├── Home.tsx
│ │ │ ├── Layout.tsx
│ │ │ ├── ListApplications.tsx
│ │ │ ├── Login.tsx
│ │ │ └── ViewModel.tsx
│ │ ├── assets
│ │ │ └── react.svg
│ │ ├── components
│ │ │ ├── AccountForm
│ │ │ │ ├── AccountForm.tsx
│ │ │ │ └── AccountForm.css
│ │ │ ├── ApplicationCard
│ │ │ │ ├── ApplicationCard.tsx
│ │ │ │ └── ApplicationCard.css
│ │ │ ├── Footer
│ │ │ │ ├── Footer.tsx
│ │ │ │ └── Footer.css
│ │ │ ├── FormInput
│ │ │ │ ├── FormInput.tsx
│ │ │ │ └── FormInput.css
│ │ │ ├── Header
│ │ │ │ ├── Header.tsx
│ │ │ │ └── Header.css
│ │ │ ├── Layout
│ │ │ │ ├── Layout.tsx
│ │ │ │ └── Layout.css
│ │ │ └── LoginBox
│ │ │     ├── LoginBox.tsx
│ │ │     └── LoginBox.css
│ │ ├── controllers
│ │ │ ├── CreateAccountController.tsx
│ │ │ ├── HomeController.tsx
│ │ │ ├── ListApplicationsController.tsx
│ │ │ └── LoginController.tsx
│ │ ├── models
│ │ │ └── ApplicantModel.tsx
│ │ ├── utils
│ │ │ └── auth.ts
│ │ ├── view-models
│ │ │ ├── ViewModel.ts
│ │ │ └── VMInterface.ts
│ │ ├── views
│ │ │ ├── CreateAccountView
│ │ │ │ ├── CreateAccountView.tsx
│ │ │ │ └── CreateAccountView.css
│ │ │ ├── HomeView
│ │ │ │ ├── HomeView.tsx
│ │ │ │ └── HomeView.css
│ │ │ ├── ListApplicationsView
│ │ │ │ ├── ListApplicationsView.tsx
│ │ │ │ └── ListApplicationsView.css
│ │ │ └── LoginView
│ │ │     ├── LoginView.tsx
│ │ │     └── LoginView.css
│ │ ├── App.tsx
│ │ ├── index.tsx
│ │ ├── App.css
│ │ ├── index.css
│ │ ├── main.tsx
│ │ └── vite-env.d.ts
│ ├── dist (ignored by git)
│ ├── Dockerfile
│ ├── package.json
│ ├── package-lock.json (ignored by git)
│ ├── tsconfig.json
│ ├── vite.config.ts
│ ├── .eslintrc.js
│ └── .gitignore
│
├── docker-compose.yml
├── .gitignore
└── README.md
```


