import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export default class AddForm extends Component {
    handleSubmit = e => {
        e.preventDefault()
        const data = {
            title: this.title,
            description: this.description,
            status: this.status,
            due_date: this.due_date
        }
        console.log(data);
        
        axios.post('/todos', data, {headers: {access_token: localStorage.getItem('access_token')}})
            .then(res => {
                console.log(res.data);
                Swal.fire(
                    'Successfully Create Todo',
                    'success'
                )
                this.props.history.push('/dashboard')
            })
            .catch(err => {
                console.log(err);
                Swal.fire(
                    'Failed to create todo',
                    'Something went wrong!',
                    'error'
                  )
            })
    }
    render() {
        return (
            <div id="page" className="col-sm-6 offset-sm-3 text-center">
                <h1>Create New Todos</h1>
                <form id="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="input-title">Title</label>
                    <input type="text" className="form-control" id="title-create" aria-describedby="titlelHelp" onChange={e => this.title = e.target.value} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-description">description</label>
                        <input type="text" className="form-control" id="description-create" aria-describedby="descriptionlHelp" onChange={e => this.description = e.target.value} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-status">Status</label>
                        <select className="form-control" id="status-create" onChange={e => this.status = e.target.value}>
                            <option >--choose--</option>
                            <option defaultValue="Done">Done</option>
                            <option defaultValue="On Progress">On Progress</option>
                            <option defaultValue="Coming Soon">Coming Soon</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-due_date">Due Date</label>
                        <input type="date" className="form-control" id="due_date-create" onChange={e => this.due_date = e.target.value} />
                    </div>
                    <button type="submit" className="btn btn-outline-dark">Submit</button>
                </form>
            </div>
        )
    }
}