import React, { useState, useEffect } from 'react';
import CvService from '../services/CvService';
import { Link } from 'react-router-dom';

const ListCV = () => {
    const [cv, setCv] = useState([]);
    const [cvActual, setCvActual] = useState(null);
    const [indexActual, setIndexActual] = useState(-1);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        devolverCV();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const devolverCV = () => {
        CvService.getAll()
            .then(response => {
                setCv(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.error(e);
            });
    };

    const refreshList = () => {
        devolverCV();
        setCvActual(null);
        setIndexActual(-1);
    };

    const findByName = () => {
        CvService.findByName()
            .then(response => {
                setCv(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.error(e)
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                        Buscar
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Lista de CVs</h4>
                <ul className="list-group">
                {cv &&
                    cv.map((cv, index) => (
                    <li
                        className={
                        "list-group-item " + (index === indexActual ? "active" : "")
                        }
                        onClick={() => setCvActual(cv, index)}
                        key={index}
                    >
                        {cv.nombre}
                    </li>
                    ))
                }
                </ul>
            </div>
            <div className="col-md-6">
                {cvActual ? (
                <div>
                    <h4>CV</h4>
                    <div>
                    <label>
                        <strong>Nombre:</strong>
                    </label>{" "}
                    {cvActual.nombre}
                    </div>
                    
                    <Link
                    to={"/cvs/" + cvActual.id}
                    className="badge badge-warning"
                    >
                    Editar
                    </Link>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please click on a Tutorial...</p>
                </div>
                )}
            </div>
        </div>
    )
}

export default ListCV;