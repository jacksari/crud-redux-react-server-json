import React from 'react';
import {Link} from "react-router-dom";

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <div className="container">
                <h1><Link className="text-light" to="/">CRUD - React, REDUX</Link></h1>
            </div>
            <Link className="btn btn-danger nuevo-post d-block d-md-inline-block" to="/productos/nuevo">Agregar producto &#43;</Link>
        </nav>
    );
}

export default Header;