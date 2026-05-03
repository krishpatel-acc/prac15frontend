# prac15

React frontend that communicates with the `prac15backend` Node.js and Express API.

## API URL

The frontend reads its backend URL from `.env`:

```bash
REACT_APP_BACKEND_URL=http://localhost:5050
```

For deployment, replace that value with your deployed backend URL before building the React app.

## Run

Start the backend first:

```bash
cd ../prac15backend
npm install
npm start
```

Start the frontend:

```bash
npm install
npm start
```

The backend runs on `http://localhost:5050` by default, and the React app opens at `http://localhost:3000`.
