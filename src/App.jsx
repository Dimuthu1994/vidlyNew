import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/common/navBar";
import { ToastContainer } from "react-toastify";
import { getCurrentUser } from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import ProtectedRoutes from "./components/common/protectedRoutes";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const findUser = getCurrentUser();
    setUser(findUser);
  }, []);

  return (
    <>
      <ToastContainer />
      <NavBar user={user} />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <ProtectedRoutes path="/movies/:id" component={MovieForm} />

          {/* <Route path="/movies/new" component={MovieForm}></Route> */}
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={user} />}
          ></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;
