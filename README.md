# Atlas Chat

This is the web client for [atlas-chat](https://github.com/jordanos/atlas-chat-server) server.

WEB DEMO [atlas-chat](https://atlas-chat.shegapps.com).

API DEMO [atlas-chat-api](https://atlas-chat-api.shegapps.com).

## Quick Install

We are using [pnpm](https://pnpm.io/) to manage our dependencies and we suggest you do the same.

- `pnpm install` will install all dependencies required to run the system.
- `pnpm start` will start and serve the webapp on port `3000`.

## 🚀 Building for production

- `pnpm build` will build the code and store it in the `./build` directory.
- You can use nginx or other static webserver to serve what's in the build folder.

## Technologies

- ReactJs
- Vite (Bootstraping reactjs project)
- Material UI (Style and theme)
- React-router-dom (Routing)
- Redux (State management)
- Rtk-query (API requests)
- React-hook-forms (Form)
- React testing library (Unit and Integration testing)
- Playwright (E2E testing)
- Sentry (Error and performance reporting)
- Husky (Linting and running tests on local environment every time a commit is made)
- CodeQL (CI for checking code quality and vulnerability)

## Features

- Authentication
- Real-time chat
- Group/Private chats
- Creating rooms, adding users in rooms

## Known issues
- Room status updates are not real-time
- User status updates are not real-time

## 💁 Contributing

Before you start contributing please read the requirements [here](./CONTRIBUTING.md).
Thank you and happy codding☕️!
