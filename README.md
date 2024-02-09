#Project Structure

IV1201-Recruitment-Application/
│
├── back_end/                          # Back-end application
│   ├── src/                            # Source files
│   │   ├── controller/                 # Controllers for handling requests
│   │   │   ├── login.ts
│   │   │   └── personController.ts
│   │   ├── integration/                # Database integration/config files
│   │   │   └── dbConfig.ts
│   │   ├── model/                      # Data models
│   │   │   ├── availability.txt
│   │   │   ├── competence-profile.ts
│   │   │   └── person.ts
│   │   ├── routes/                     # Route definitions
│   │   │   └── personRoutes.ts
│   │   ├── services/                   # Business logic/services
│   │   │   └── authService.ts
│   │   └── index.ts                    # Entry point for the back-end application
│   ├── initdb/                         # Database initialization scripts
│   ├── node_modules/                   # Node.js modules (ignored by git)
│   ├── dist/                           # Compiled code (ignored by git)
│   ├── Dockerfile                      # Docker configuration for back-end
│   ├── package.json                    # Node.js project dependencies and scripts
│   ├── package-lock.json               # Locked versions of dependencies (ignored by git)
│   ├── tsconfig.json                   # TypeScript configuration
│   ├── .eslintrc.yml                   # ESLint configuration
│   └── .gitignore                      # Ignored files in back-end
│
├── front_end/                          # Front-end application (React)
│   ├── public/                         # Public assets
│   ├── src/                            # Source files
│   │   ├── types/                      # TypeScript types definitions
│   │   ├── assets/                     # Static assets like images, fonts, etc.
│   │   ├── components/                 # React components
│   │   │   └── Login/                  # Login component
│   │   │       ├── LoginBox.tsx
│   │   │       └── LoginBox.css
│   │   ├── controllers/                # Controllers (if used in front-end)
│   │   ├── models/                     # Data models (if used in front-end)
│   │   ├── view-models/                # View models for MVVM pattern
│   │   ├── views/                      # Views/React components
│   │   ├── App.tsx                     # Main App component
│   │   ├── index.tsx                   # Entry point for the front-end application
│   │   ├── main.css                    # Main stylesheet
│   │   └── vite-env.d.ts               # Vite environment declarations
│   ├── node_modules/                   # Node.js modules (ignored by git)
│   ├── dist/                           # Build directory for compiled/bundled code (ignored by git)
│   ├── package.json                    # Project dependencies and scripts
│   ├── package-lock.json               # Locked versions of dependencies (ignored by git)
│   ├── tsconfig.json                   # TypeScript configuration
│   ├── .gitignore                      # Ignored files in front-end
│   └── README.md                       # README specific to the front-end
│
├── docker-compose.yml                  # Docker compose configuration for the entire stack
├── README.md                           # Main project README with instructions and documentation
└── .gitignore                          # Global .gitignore for the entire repository
