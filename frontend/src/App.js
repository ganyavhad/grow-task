import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
 
import Login from './Login';
import Register from './Register';
import Home from './Home';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <div>
        <div className="content">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home/:id" component={Home} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </div>  );
}

export default App;
