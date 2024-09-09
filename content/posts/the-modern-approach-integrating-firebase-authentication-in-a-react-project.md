---
title: "The Modern Approach: Integrating Firebase Authentication in a React Project"
description: Comprehensive tutorial on seamlessly incorporating Firebase authentication into a React project, leveraging modern functional, instead of previos class-based, syntax of the Firebase SDK. Uncover the intricacies of this newer syntax, which, despite its benefits, lacks extensive documentation and available resources on the internet at the time of writing.
pubDatetime: 2023-07-09T00:00:00.000Z
modDatetime: 2024-03-25T04:34:31.411Z
tags:
  - tutorial
  - web
---

Firebase is one of the most popular Backend-as-a-Service solutions for frontend applications, providing a range of functionalities like authentication, database management, and more. Last week, I wanted to add authentication and cloud sync functionality to one of my old projects, which I made in vanilla JS while following [The Odin Project](https://www.theodinproject.com/). Instead of just doing just that, I decided to redo that project in React and it was here that I encountered some challenges, especially when it came to finding resources that utilized the recommended `createBrowserRouter` from React Router v6.4. Additionally, the Firebase documentation wasn't the most user-friendly (though it did bring out a few laughs!), and asking AI tools led me astray and wasted three whole days of my time (Lesson learned: Don't trust AI tools).

Determined not to be defeated, I decided to embark on a mini-project, using React, React Router, and the Firebase Modular API syntax to experiment and design an authentication solution that I want. Finally, after two days of perseverance, I succeeded!

In this blog post, I am excited to share my experience and the technique I used to integrate Firebase authentication seamlessly into my React project.

## Table of Contents

## Prerequisites

Before we dive into integrating Firebase authentication into our React project, let's establish a few prerequisites. Firstly, it is assumed that this is not your first react project, and you also have some basic understanding of client-side [routing](https://reactrouter.com/).

However, I won't make any assumptions about your familiarity with Firebase (or you would not have been reading this). Optionally, it would be beneficial if you have a basic understanding of [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) in JavaScript/TypeScript, as this will help you better understand the code examples.

I used the [Vite](https://vitejs.dev/) bundler to bootstrap my project, with `src/main.ts` as the entry point. Feel free to use any other bundler of your choice. It's worth noting that while I'm using TypeScript in my project, I have modified the code examples below to be in JavaScript for simplicity and broader compatibility. Rest assured, the concepts and steps discussed remain the same.

Lastly, to save time and focus on the core concepts, we will forgo any styling in this tutorial. Now that we have our prerequisites covered, let's move on to the implementation details.

## Firebase Setup

To begin integrating Firebase authentication into our React project, follow the steps below:

1. Install the Firebase SDK in your project:

```bash
npm install firebase
```

1. Visit the [Firebase](https://firebase.google.com/) and click on "Get Started".

2. In the Firebase console, click on "Create/Add Project" and provide a name for your project. You can disable analytics for now.

3. Add a web app to your project by clicking on the icon that resembles `</>`. You will be prompted to enter a nickname for your app.

4. Copy the Firebase configuration code that is provided. We will need this configuration to initialize Firebase in our project.

5. From the project overview in the Firebase console, enable authentication from the Authentication section and enable the email/password provider (in the Sign-in method tab of the authentication section)

6. Create a new file called `src/firebase.js`. We will use this file to create convenient wrapper functions that abstract away the complexities of Firebase. This will help keep our code clean and make it easier to switch to a different backend in the future if needed.

7. Now to use the email/password provider for the authentication, we will require the following functions from `firebase/auth`: `getAuth`, `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `sendPasswordResetEmail`, and `signOut`.

```js
/* firebase.js */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  // Code you copied in setp 4 above
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the authentication service

/**
 * Create a new user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>} - A promise that resolves with a UserCredential object on success.
 */
const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Sign in an existing user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>} - A promise that resolves with a UserCredential object on success.
 */
const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Send a password reset email to the user
 * @param {string} email
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 */
const resetPassword = email => {
  return sendPasswordResetEmail(auth, email);
};

/**
 * Sign out the current user
 * @returns {Promise<void>} - A promise that resolves when the user is signed out.
 */
const logout = () => {
  return signOut(auth);
};

export { auth, register, login, resetPassword, logout };
```

Let's now proceed to write a custom hook that will help us keep track of the user's authentication status. This custom hook will utilize Firebase's `onAuthStateChanged` function. The `onAuthStateChanged` function takes a callback function as its second argument, which will be triggered by the authentication service whenever the user's authentication state changes.

```js
/* src/hooks/useAuth.js */
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Subscribe to the Firebase Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log("User is signed in.");
        setUser(user);
      } else {
        console.log("User is not signed in.");
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
  };
}

export { useAuth };
```

You may be wondering why we included a loading state in the custom hook. The reason is that when our app loads, the UI components may render before the authentication state is known. By using the loading state, we can ensure that other components display a loading animation or any appropriate placeholder while the authentication state is being fetched.

## Creating Routes

We need to set up routes that handle various user actions, such as logging in, creating a new user, and resetting the password.

Let's start by creating the necessary route components. Create the following files in the `src/routes` directory:

1. `Login.jsx`
2. `Register.jsx`
3. `ResetPassword.jsx`

Next, we'll move our existing `App.jsx` component to `src/routes/App.jsx`. This will serve as the main app route.

Keep in mind that the code for each of these routes will be straightforward, as we won't be using any functions from `firebase.js` directly. The actual integration with Firebase will be handled by client-side [form actions](https://reactrouter.com/en/main/route/action) when we implement the routes.

With the route components in place, we can proceed to implement the necessary logic and connect them to the appropriate Firebase functionality in the upcoming sections. Here are the route components from my mini-project for reference:

```jsx
/* src/routes/Login.jsx */
import { Form, Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login">
      <h1>Login</h1>
      <Form method="POST">
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div className="form-field">
          <button type="submit">Login</button>
        </div>
      </Form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p>
        Forgot your password? <Link to="/reset-password">Reset Password</Link>
      </p>
    </div>
  );
}
```

```jsx
/* src/routes/Register.jsx */
import { Form, Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="register">
      <h1>Register</h1>
      <Form method="POST">
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div className="form-field">
          <label htmlFor="password-confirm">Confirm Password</label>
          <input
            type="password"
            name="password-confirm"
            id="password-confirm"
            required
          />
        </div>
        <div className="form-field">
          <button type="submit">Register</button>
        </div>
      </Form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
```

```jsx
/* src/routes/ResetPassword.jsx */
import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../firebase";

const MINUTE = 60 * 1000;

export default function ResetPassword() {
  const [count, setCount] = useState(0);

  return (
    <div className="reset-password">
      <h1>Reset Password</h1>
      <form
        method="POST"
        onSubmit={async e => {
          e.preventDefault();
          setCount(MINUTE);
          const interval = setInterval(() => {
            setCount(count => count - 1000);
          }, 1000);
          setTimeout(() => {
            clearInterval(interval);
            setCount(0);
          }, MINUTE);

          const email = e.target.email.value;
          try {
            console.log("Resetting password...");
            await resetPassword(email);
            alert("Check your email to reset your password!");
          } catch (err) {
            console.error(err);
            alert(
              "Error sending password reset email. Make sure you entered your email correctly."
            );
          }
        }}
      >
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className="form-field">
          <button type="submit" disabled={count > 0}>
            Send Password Reset Link
          </button>
          <p>
            Wait {Math.floor(count / 1000)} seconds before sending another
            email.
          </p>
          <p>
            Resetted your password? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
```

We have implemented a cooldown time of 1 minute after the user submits their email for the password reset link in `ResetPassword.jsx` to prevent the user from spamming the send button.

You may notice that we're using `setCount()` with a function `count => count - 1000` instead of directly updating the state with a new value. This is because of the [closure](https://hashnode.com/post/clgwfm8mw000c09lfcxqfex2o) created by `setInterval()`. Inside the interval, the `count` value would not change unless we provide a function to update the state based on the current value.

## Setting Up Routing

To set up routing in our application, we will use `createBrowserRouter` from `react-router-dom`. It's recommended to have top-level routes for authentication purposes to separate the authentication logic from the main application, making it more reusable and flexible.

In `src/main.js`:

```js
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Routes:
import App from "./routes/App.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import ResetPassword from "./routes/ResetPassword.jsx";

// See the next paragraph for explaination of this line
import { registerAction, loginAction } from "./actions.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

In the provided code, the `actions.js` file contains asynchronous functions that are executed when a [Form](https://reactrouter.com/en/main/components/form) is submitted on a specific route. These functions handle user login and registration logic by taking user input from the form and calling the appropriate functions from `firebase.js`.

```js
/* actions.js */
import { redirect } from "react-router-dom";
import { register, login } from "./firebase";

export const registerAction = async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    try {
        await register(data.email.toString(), data.password.toString());
        return redirect("/");
    } catch (error) {
        console.log(error);
        alert(error.message);
        return null;
    }
};

export const loginAction = async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    try {
        await login(data.email.toString(), data.password.toString());
        return redirect("/");
    } catch (error: any) {
        console.log(error);
        alert(error.message);
        return null;
    }
};
```

## Set Up Authentication Context

Now, we need to protect our `<App />` route to prevent users from accessing the application without authentication. To achieve this, we will set up a context using the Context API so that our application can access the user's authentication state.

Create `src/AuthContext.js` and `src/AuthProvider.jsx`:

```js
/* src/AuthContext.js */
import { createContext } from "react";

// This will store currently authenticated user
const AuthContext = createContext(null);
export default AuthContext;
```

```jsx
/* src/AuthProvider.jsx */
import AuthContext from "./AuthContext";
import { useAuth } from "./hooks/useAuth"; // Our Custom hook

export default function AuthProvider({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

const AuthProvider = AuthContext.Provider;
export default AuthProvider;
```

The `AuthProvider` component wraps our application and provides access to the authentication context. Inside `AuthProvider`, we use the `useAuth` hook to get the user's authentication state. While the authentication state is loading, we display a loading indicator. Once the authentication state is fetched, we provide the `user` value as the context value.

In `main.js`, we need to update our code to include the `AuthProvider`:

```js
// ... rest of the imports
import AuthProvider from "./AuthProvider.jsx";

// ...rest of the code

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// ...rest of the code
```

By wrapping our application with the `AuthProvider`, we ensure that our app has access to the authentication context.

However, there's still a missing piece. Users can still directly access the `<App />` route without authentication, and we don't have a mechanism to redirect them to the login page if they're not authenticated or redirect them to the app from the login page if they're already authenticated.

## Set Up Protected Routes

To address this, we'll create two new components: `ProtectedRoute` and `UnprotectedRoute`, which can be used to protect or unprotect specific routes. These components will handle the redirection logic. This approach allows for flexibility and avoids duplicating code, making it easier to add or remove routes in the future if needed.

In the `Protected` component, we use the `useContext` hook to access the `AuthContext`. If the user is not authenticated, we use the `Navigate` component from `react-router-dom` to redirect them to the login page:

```jsx
/* src/Protected.jsx */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";

function Protected({ children }) {
  const user = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Protected;
```

Similarly, in the `Unprotected` component, we use the `useContext` hook to access the `AuthContext`. If the user is already authenticated, we use `Navigate` to redirect them to the home page.

```jsx
/* src/Unprotected.jsx */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";

function Unprotected({ children }) {
  const user = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default Unprotected;
```

Finally, in the `main.js` file, we import the `Protected` and `Unprotected` components. We wrap the `<App />` route with the `Protected` component to ensure it is only accessible to authenticated users. Similarly, we wrap the `Login`, `Register`, and `ResetPassword` routes with the `Unprotected` components prevent authenticated users from accessing those routes.

```js
// ... rest of imports
import Protected from "./Protected.jsx";
import Unprotected from "./Unprotected.jsx";

// ...rest of code

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <App />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: (
      <Unprotected>
        <Login />
      </Unprotected>
    ),
    action: loginAction,
  },
  {
    path: "/register",
    element: (
      <Unprotected>
        <Register />
      </Unprotected>
    ),
    action: registerAction,
  },
  {
    path: "/reset-password",
    element: (
      <Unprotected>
        <ResetPassword />
      </Unprotected>
    ),
  },
]);
// ...rest of code
```

## Setup Logout

To implement the logout functionality in our application, we can add a button that triggers the `logout` function that we wrote in `firebase.js`. This is a simple step that allows users to log out of the application.

```js
/* src/routes/App.js */
// ...rest of imports
import { logout } from "../firebase";

// ...rest of the code
<button onClick={logout}>Log Out</button>;
// ...rest of the code
```

## Conclusion

Congratulations! We have successfully integrated Firebase authentication into our React project. The process involved setting up Firebase, creating custom functions to handle authentication actions, and implementing protected routes to ensure secure access to the application.

In conclusion, the approach discussed in this tutorial was based on my own mini-project experience. When applying this integration to your project, you may need to make some tweaks and modifications to fit your specific requirements.

If you want to explore further customization possibilities, you can consider adding Firestore for database functionality. The process would be similar to what we've done for authentication, importing the necessary functions from Firebase and creating custom functions to handle database operations.

Please feel free to provide feedback or ask any questions in the comments section below.

![boys jumping around fire gif](https://media.tenor.com/ejLtGYdTc0IAAAAC/ritual-sakamoto.gif)
