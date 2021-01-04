import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Nav extends Component {
    handleClick = () => {
        localStorage.clear()
      }
    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                            <a className="navbar-brand" href="/dashboard">
                            <img src="https://apprecs.org/gp/images/app-icons/300/8a/io.tinbits.memorigi.jpg" width="30" height="30" className="d-inline-block align-top" alt=""/>
                            Fancy Todo v.2 with React
                            </a>
                        <div className="d-flex">
                            {localStorage.getItem('access_token') ? 
                            (<div >
                                <Link to={'/'} ><i className="fas fa-sign-out-alt" onClick={this.handleClick}> Sign Out</i></Link>
                            </div>) : 
                            (<div >
                                <Link to={'/'} ><i className="fas fa-sign-in-alt"> Sign In</i></Link>
                            </div>)}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}