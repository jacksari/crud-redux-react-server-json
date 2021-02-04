import React from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {borrarProductoAction, obtenerProductoEditar} from "../actions/productoActions";
import Swal from "sweetalert2";

function Producto({producto,index}) {

    const dispatch = useDispatch()
    const history = useHistory()

    //confirmar si desea eliminar
    const confirmarEliminarProducto = id => {
        //Preguntar al usuario
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //pasarlo al dispatch
                dispatch( borrarProductoAction(id) )
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    //Funcion que redirige de forma programada
    const redireccionarEditar = producto => {
        dispatch( obtenerProductoEditar(producto) )
        history.push(`/productos/editar/${producto.id}`)
    }

    return (
        <tr>
            <th scope="row">{index+1}</th>
            <td>{producto.nombre}</td>
            <td><span className="font-weight-bold text-danger">{producto.precio}</span></td>
            <td className="acciones">
                <button onClick={() => redireccionarEditar(producto)} type="button" className="btn btn-primary mr-2">Editar</button>
                <button onClick={() => confirmarEliminarProducto(producto.id)} className="btn btn-danger" type="button">Eliminar</button>
            </td>
        </tr>
    );
}

export default Producto;