import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const UserDetails = () => {

    //Los parametros son los definidos en el layaut con users/:userId
    const params = useParams();
    const id = params.userId - 1; //Se resta 1 porque el array inicia en posicion 0
    const userView = JSON.parse(localStorage.getItem('usersLocal'))
    console.log(userView)


    return (
        <div className="container">
            <div className="card border-succes mb-3">
                <h5 className="card-header">User Nº {id + 1}</h5>
                <div className="card-body">
                    <h3 className="card-title"> {userView[id].name} </h3>
                    <p className="card-subtitle"><strong>User Name: </strong> {userView[id].username} </p>
                    <p className="card-subtitle"><strong>Email: </strong> {userView[id].email} </p>
                    <p className="card-subtitle"><strong>Address: </strong> {userView[id].address.suite} {userView[id].address.street} {userView[id].address.city} </p>
                    <p className="card-subtitle"><strong>Phone: </strong> {userView[id].phone} </p>
                    <p className="card-subtitle"><strong>Web Site: </strong> {userView[id].website} </p>
                    <p className="card-subtitle"><strong>Company: </strong> {userView[id].company.name} </p>
                </div>
                <div className="card-body text-end">
                    <Link to={`/users`}>
                        <button className="btn btn-outline-secondary"> Return </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};