# Project Structure
```
 IV1201-Recruitment-Application
├── back_end
│ ├── src
│ │ ├── controller
│ │ │ ├── login.ts
│ │ │ └── personController.ts
│ │ ├── integration
│ │ │ └── dbConfig.ts
│ │ ├── model
│ │ │ ├── availability.txt
│ │ │ ├── competence-profile.ts
│ │ │ └── person.ts
│ │ ├── routes
│ │ │ └── personRoutes.ts
│ │ ├── services
│ │ │ └── authService.ts
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
│ ├── public
│ ├── src
│ │ ├── types
│ │ ├── assets
│ │ ├── components
│ │ │ └── Login
│ │ │ ├── LoginBox.tsx
│ │ │ └── LoginBox.css
│ │ ├── controllers (if used in front-end)
│ │ ├── models (if used in front-end)
│ │ ├── view-models (for MVVM pattern)
│ │ ├── views
│ │ ├── App.tsx
│ │ ├── index.tsx
│ │ ├── main.css
│ │ └── vite-env.d.ts
│ ├── node_modules (ignored by git)
│ ├── dist (ignored by git)
│ ├── package.json
│ ├── package-lock.json (ignored by git)
│ ├── tsconfig.json
│ ├── .gitignore
│ └── README.md
│
├── docker-compose.yml
├── README.md
└── .gitignore
```
