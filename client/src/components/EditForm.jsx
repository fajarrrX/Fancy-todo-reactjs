import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

class EditForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',
            // status: '',
            due_date: '',
            id: this.props.match.params.id
        }
        this.getDetail = this.getDetail.bind(this)
    }

    getDetail (id) {
        console.log(id);
        axios.get('/todos/' + id, {headers: {access_token: localStorage.getItem('access_token')}})
        .then(res => {
            // console.log(res.data.status);
            this.setState({
                title: res.data.title,
                description: res.data.description,
                // status: res.data.status,
                due_date: res.data.due_date
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    componentDidMount () {
        this.getDetail(this.state.id)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            title: this.state.title,
            description: this.state.description,
            // status: this.state.state.status,
            due_date: this.state.due_date
        }
        console.log(data);
        
        const id = this.state.id
        console.log(id, 'eeesss');
        axios.put('/todos/' + id, data, {headers: {access_token: localStorage.getItem('access_token')}})
            .then(res => {
                console.log(res.data);
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    // status: res.data.status,
                    due_date: res.data.due_date
                })
                console.log(res.data);
                Swal.fire(
                    'Successfully Create Todo',
                    'success'
                );
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
                <h1>Edit Todos</h1>
                <form id="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="input-title" >Title</label>
                    <input type="text" className="form-control" id="title-create" aria-describedby="titlelHelp" onChange={(e) => {this.setState({title: e.target.value})}} value={this.state.title} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-description">Description</label>
                        <input type="text" className="form-control" id="description-create" aria-describedby="descriptionlHelp" onChange={(e) => {this.setState({description: e.target.value})}} value={this.state.description} />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="input-status">Status</label>
                        <select className="form-control" id="status-create" onChange={(e) => {this.setState({status: e.target.value})}} value={this.state.status}>
                            <option disabled >--choose--</option>
                            <option value="Done">Done</option>
                            <option value="On Progress">On Progress</option>
                            <option value="Coming Soon">Coming Soon</option>
                        </select>
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="input-due_date">Due Date</label>
                        <input type="date" className="form-control" id="due_date-create" onChange={(e) => {this.setState({due_date: e.target.value})}} value={this.state.due_date} />
                    </div>
                    <button type="submit" className="btn btn-outline-dark">Submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(EditForm)