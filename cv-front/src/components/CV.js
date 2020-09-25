import React, { useState, useEffect } from "react";
import CvService from '../services/CvService';

const CV = props => {
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
  const [cvActual, setCvActual] = useState(initialCvState);
  const [message, setMessage] = useState("");

  const getCv = id => {
    CvService.get(id)
      .then(response => {
        setCvActual(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCv(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCvActual({ ...cvActual, [name]: value });
  };

  const updatePublished = status => {
    var data = {
        nombre: cvActual.nombre,
        foto: cvActual.foto,
        perfil: cvActual.perfil,
        datos: cvActual.datos,
        educacion: cvActual.educacion,
        cursos: cvActual.cursos,
        experiencia: cvActual.experiencia,
        skills: cvActual.skills
    }

    CvService.update(cvActual.id, data)
      .then(response => {
        setCvActual({ ...cvActual, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateCv = () => {
    CvService.update(cvActual.id, cvActual)
      .then(response => {
        console.log(response.data);
        setMessage("El CV se actualizó correctamente!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCv = () => {
    CvService.remove(cvActual.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {cvActual ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={cvActual.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={cvActual.nombre}
                onChange={handleInputChange}
              />
            </div>

          </form>

          
          <button className="badge badge-danger mr-2" onClick={deleteCv}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCv}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default CV;