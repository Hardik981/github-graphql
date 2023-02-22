import React, { Dispatch, SetStateAction, useState, createContext, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import UI from './UI';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql'
});
let Token: any
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: Token ? `Bearer ${Token}` : "",
    }
  }
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/ui",
    element: <UI />,
  },
]);

type AppContextType = {
  token?: string,
  setToken?: Dispatch<SetStateAction<string>>
}
export const AppContext = createContext<AppContextType>({});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppData />
    </ApolloProvider>
  </React.StrictMode>
);

function AppData() {
  const [token, setToken] = useState("")
  useEffect(() => {
    Token = token
  }, [token])
  return (
    <>
      <AppContext.Provider value={{ token, setToken }}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
