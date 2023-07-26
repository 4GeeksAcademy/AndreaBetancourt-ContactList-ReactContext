import React, { useEffect, useState } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import { Link } from "react-router-dom";

export const Users = () => {

    const [users, setUsers] = useState();
    const host = 'https://jsonplaceholder.typicode.com';
    const url = host + '/users';

    const getUsers = async () => {
        // 1. Verifico si tengo los usuarios en el localStorage
        if (localStorage.getItem('usersLocal') !== null) {
            //2. Si existe, a mi users por medio de setUsers le voy a asignar el valor de localstorage. El JSON va a ser un string en el localstorage
            setUsers(JSON.parse(localStorage.getItem('usersLocal'))) 
        } else {
            // 3. Si no existe, se debe hacer el fetch, guardo datos en el estado y en el localstorage
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json();
                // 3.1. Almaceno en el estado
                setUsers(data)
                // 3.2. Almaceno en localstorage
                localStorage.setItem("usersLocal", JSON.stringify(data)); //Lo que esta en data se transforma a str
            } else {
                console.log('Error: ', response.status, response.statusText);
            }
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="container">
            <h1 className="text-center">List Users</h1>
            {!users ? 'Cargando...' :
                users.map((user,i) => {
                    return (
                        <div className="container" key={i}>
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        <img src={rigoImage} className="img-fluid rounded-circle mt-2" alt="foto" />
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-body">
                                            <h5 className="card-title">{user.name}</h5>
                                            <p className="card-subtitle"><i className="fas fa-map-marker-alt me-4"></i>{user.address.suite} {user.address.street} {user.address.city}</p>
                                            <p className="card-subtitle"><i className="fas fa-phone me-3"></i>{user.phone}</p>
                                            <p className="card-subtitle"><i className="far fa-envelope me-3"></i>{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-2 text-end">
                                        <div className="card-body me-3">
                                            <Link to={`/users/${user.id}`}>
                                                <button className="btn btn-outline-secondary me-2">
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    );
}