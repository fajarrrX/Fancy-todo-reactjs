import React, { Component } from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import TodoList from './components/TodoList'
import Nav from './components/Nav'
import AddForm from './components/AddForm'
import EditForm from './components/EditForm';
import EditStatus from './components/EditStatus';

export default class App extends Component {
    render() {
        return (
          <div>
              <div className="App">
                <BrowserRouter>
                  <Nav />
                  <Switch>               
                  <Route path='/' exact component={Login} />
                  <Route path='/register' component={Register} />
                  <Route path='/add' component={AddForm} />
                  <Route path='/edit/:id' component={EditForm} />
                  <Route path='/editstatus/:id' component={EditStatus} />
                  <Route path='/dashboard' component={TodoList} />
                  </Switch>
                </BrowserRouter>
              </div>
          </div>
        )
    }
}

// import React from 'react'

// function App() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default App
