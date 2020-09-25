import React, { useState } from 'react';
import CvService from '../services/CvService';

const AddCV = () => {
    const initialCvState = {
        id: null,
        nombre: "",
        foto: "",
        perfil: "",
        datos: {},
        educacion: [],
        cursos: [],
        experiencia: [],
        skills: []
    };

    const [cv, setCV] = useState(initialCvState);
    const [curso, setCurso] = useState({});
    const [envio, setEnvio] = useState(false);

    const handleInputText = e => {
        const { name, value } = e.target;
        setCV({...cv, [name]: value})
    }

    //no se como armar esto para que carge la info dentro de un objeto o array
    const handleCursos = e => {
        const { name, value } = e.target;
        setCurso({...curso, [name]: value})
        setCV({...cv, cursos: [curso]})
        console.log(cv)
    }

    const saveCv = () => {
        //TO-DO = ver de cambiar var por let
        var data = {
            nombre: cv.nombre,
            foto: cv.foto,
            perfil: cv.perfil,
            datos: cv.datos,
            educacion: cv.educacion,
            cursos: cv.cursos,
            experiencia: cv.experiencia,
            skills: cv.skills
        }
        
        console.log(data)

        CvService.create(data)
        .then(response => {
            setCV({
                nombre: response.data.nombre,
                foto: response.data.foto,
                perfil: response.data.perfil,
                datos: response.data.datos,
                educacion: response.data.educacion,
                cursos: response.data.cursos,
                experiencia: response.data.experiencia,
                skills: response.data.skills
            });
            setEnvio(true);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    const newCv = () => {
        setCV(initialCvState);
        setEnvio(false);
    };

    return (
        <div className="submit-form">
        {
            envio ? (
                <div>
                    <h4>Cv Cargado exitosamente</h4>
                    <button className="btn btn-success" onClick={newCv}>
                        Agregar
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        required
                        value={cv.nombre}
                        onChange={handleInputText}
                        name="nombre"
                        />
                    </div>
                    <div className="form-group">
                        <label>Cursos</label>
                        <input 
                        type="text"
                        className="form-control"
                        id="institucion"
                        placeholder="Institución"
                        required
                        value={cv.cursos.institucion}
                        onChange={handleCursos}
                        name="institucion"
                        />

                        <input 
                        type="text"
                        className="form-control"
                        id="carrera"
                        required
                        value={cv.cursos.carrera}
                        onChange={handleCursos}
                        name="carrera"
                        />

                        <input 
                        type="text"
                        className="form-control"
                        id="fechadesde"
                        placeholder="Desde..."
                        required
                        value={cv.cursos.fechadesde}
                        onChange={handleCursos}
                        name="fechadesde"
                        />

                        <input 
                        type="text"
                        className="form-control"
                        id="fechahasta"
                        placeholder="Hasta..."
                        required
                        value={cv.cursos.fechahasta}
                        onChange={handleCursos}
                        name="fechahasta"
                        />
                    </div>
                    <div className="form-group">
                        <label>Cursos 2</label>
                        <input 
                        type="text"
                        className="form-control"
                        id="institucion"
                        placeholder="Institución"
                        required
                        value={cv.cursos.institucion}
                        onChange={handleCursos}
                        name="institucion"
                        />

                        <input 
                        type="text"
                        className="form-control"
                        id="carrera"
                        required
                        value={cv.cursos.carrera}
                        onChange={handleCursos}
                        name="carrera"
                        />

                        <input 
                        type="text"
                        className="form-control"
                        id="fechadesde"
                        placeholder="Desde..."
                        required
                        value={cv.cursos.fechadesde}
                        onChange={handleCursos}
                        name="fechadesde"
                        />

                        <input 
                        type="text"
                        className="form-control"
                        id="fechahasta"
                        placeholder="Hasta..."
                        required
                        value={cv.cursos.fechahasta}
                        onChange={handleCursos}
                        name="fechahasta"
                        />
                    </div>
                    <button onClick={saveCv} className="btn btn-success">
                        Cargar
                    </button>
                </div>
            )}
        </div>
    )
}

export default AddCV;
