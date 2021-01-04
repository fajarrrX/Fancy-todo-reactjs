import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class TodoCard extends Component {
    render() {
        return (
            <div>
            <div className="card p-2">
                <h3 className="card-title">{this.props.title}</h3>
                <div className="card-body">
                <p className="card-description">{this.props.description}</p>
                    <div className="d-flex justify-content-center">
                        <h5 className="card-status">{this.props.status} </h5> <span className="mx-2 text-success">
                        <Link to={'/editstatus/' + this.props.id} status={this.props.status}><i className="fas fa-edit fa-clickable" ></i></Link>
                        </span>
                    </div>
                    <h5 className="card-duedate">{this.props.due_date}</h5>
                    <div className="todo-icon mt-5">
                        <span className="mx-3 text-success">
                        <Link to={'/edit/' + this.props.id} title={this.props.title} description={this.props.description} status={this.props.status} due_date={this.props.due_date}><i className="fas fa-edit fa-clickable" ></i></Link>
                        </span>
                        <span className="mx-3 text-danger">
                        <i className="fas fa-trash fa-clickable" onClick={this.props.handleDelete.bind(this, this.props.id)}></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

