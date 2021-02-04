import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Header from "./components/Header";
import Productos from "./components/Productos";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";

//Redux
import { Provider } from 'react-redux'
import store from "./store";

function App() {
  return (
      <Router>
          <Provider store={store}>
              <div>
                  <Header/>
                  {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                  <div className="container mt-5">
                      <Switch>
                          <Route exact path="/" component={Productos}/>
                          <Route exact path="/productos/nuevo" component={NuevoProducto}/>
                          <Route exact path="/productos/editar/:id" component={EditarProducto}/>
                      </Switch>
                  </div>
              </div>
          </Provider>
      </Router>
  );
}

export default App;
