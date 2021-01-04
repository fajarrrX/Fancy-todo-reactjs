import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
// import Login from './Login'
import Swal from 'sweetalert2'

// function Child() {
//     let { id } = useParams()
//     // let { push } = useHistory()
//     const isAuthenticated = localStorage.getItem('access_token')

//     return (
//         <div>
//             { isAuthenticated ? <EditStatus id={id}></EditStatus> : <Login></Login>}
//         </div>
//     )
// }
class EditStatus extends Component {
    constructor(props){
        super(props)
        this.state = {
            // title: '',
            // description: '',
            status: '',
            // due_date: '',
            id: this.props.match.params.id
        }
        this.getDetail = this.getDetail.bind(this)
        // this.updateStatus = this.updateStatus.bind(this)
    }

    getDetail (id) {
        // console.log(id);
        axios.get('/todos/' + id, {headers: {access_token: localStorage.getItem('access_token')}})
        .then(res => {
            // console.log(res.data.status);
            this.setState({
                status: res.data.status
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
            // title: this.title,
            // description: this.description,
            status: this.state.status,
            // due_date: this.due_date
        }
        console.log(data);
        
        const id = this.state.id
        console.log(id, 'eeesss');
        axios.patch('/todos/' + id, data, {headers: {access_token: localStorage.getItem('access_token')}})
            .then(res => {
                console.log(res.data);
                this.setState({
                    status: res.data.status
                })
                console.log(res.data.status);
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
                <h1>Edit Status Todos</h1>
                <form id="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="input-status">Status </label>
                        <select className="form-control" id="status-create" onChange={(e) => {this.setState({status: e.target.value})}} value={this.state.status} >
                            {/* <option selected={this.state.status} disabled>{this.state.status}</option> */}
                            <option value="Done">Done</option>
                            <option value="On Progress">On Progress</option>
                            <option value="Coming Soon">Coming Soon</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-outline-dark">Submit</button>
                    <Link to={'/dashboard'}><button className="btn btn-danger">Cancel</button></Link>
                </form>
            </div>
        )
    }
}

export default withRouter(EditStatus)