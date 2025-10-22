import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <Link to="/">
                        <h1>⚡ BOLT BUCKET</h1>
                    </Link>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to="/">
                            <button>Customize</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/customcars">
                            <button>View Cars</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation