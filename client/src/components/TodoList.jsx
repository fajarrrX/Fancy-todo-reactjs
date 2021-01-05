import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import TodoCard from '../components/TodoCard'
import Swal from 'sweetalert2'


export default class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      todos: []
    }
  
  }
  componentDidMount() {
    axios.get('/todos', {headers: {access_token: localStorage.getItem('access_token')}})
    .then(res => {
      console.log(res.data);
      this.setState ({
          todos: res.data
      })
    })
    .catch(err => {
        console.log(err);
    })
  }

  handleDelete = (id) => {
    console.log(id);
    axios.delete('/todos/'+id, {headers: {access_token: localStorage.getItem('access_token')}})
    .then(res => {
      console.log(res.data);
      Swal.fire(
        'Successfully delete todo',
        'success'
      );
      this.componentDidMount()
    })
    .catch(err => {
      console.log(err);
      Swal.fire(
        'Failed to delete todo',
        'Something went wrong!',
        'error'
      )
    })
  }

  render() {
    return (
      <>
        {(!localStorage.getItem('access_token')) ? 
        <Redirect to="/" /> :
        <div>
          <h1>My Todo List</h1>
            <span className="mx-3 text-success">
                <Link to={'/add'} >
                    <i className="fas fa-plus fa-clickable"></i>
                </Link>
            </span>
            <div className="row row-cols-3">
              {this.state.todos.map(todo => {
                return (
                  <TodoCard
                  title={todo.title} 
                  description={todo.description} 
                  status={todo.status} 
                  due_date={todo.date}
                  handleDelete={this.handleDelete}
                  id={todo.id}
                  key={todo.id}
                  />
                )
              })}
          </div>
        </div>}
      </>
    )
  }
}
