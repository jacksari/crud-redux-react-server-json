import {
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGAR_PRODUCTOS_ERROR,
    DESCARGAR_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_ERROR,
    PRODUCTO_EDITADO_EXITO,
    COMENZAR_EDICION_PRODUCTO
} from '../types'

import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

//Crear nuevos proudctos
export  function crearNuevoProducto(producto){
    return async (dispatch) => {
        dispatch( agregarProducto() )
        try{
            //insertar en la API
            await clienteAxios.post('/productos', producto)
            //Si todo sale bien
            dispatch(agregarProductoExitoso(producto))
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        }catch (e) {
            console.log('error',e)
            //Si hay un error
            dispatch(agregarProductoError(true))
            //Alerta de error
            Swal.fire(
                'Hubo un error',
                'Hubo un error, intente de nuevo',
                'error'
            )
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})
const agregarProductoExitoso = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload:estado
})

//Funcion que descarga datos de la base de datos
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch({
            type: COMENZAR_DESCARGA_PRODUCTOS,
            payload: true
        })
        try {
            const respuesta = await clienteAxios.get('/productos')
            dispatch({
                type: DESCARGAR_PRODUCTOS_EXITO,
                payload: respuesta.data
            })
        }catch (e) {
            dispatch({
                type: DESCARGAR_PRODUCTOS_ERROR,
                payload: true
            })
        }
    }
}

//Selecciona y elimina un producto
export function borrarProductoAction(id){
    return async (dispatch) => {
        dispatch({
            type: OBTENER_PRODUCTO_ELIMINAR,
            payload: id
        })
        try{
            await clienteAxios.delete(`/productos/${id}`)
            dispatch({
                type: PRODUCTO_ELIMINADO_EXITO
            })
        }catch (e) {
            console.log('error', e)
            dispatch({
                type: PRODUCTO_ELIMINADO_ERROR,
                payload: true
            })
        }
    }
}

//Colocar productoen edición
export function obtenerProductoEditar(producto){
    return (dispatch) => {
        dispatch({
            type: OBTENER_PRODUCTO_EDITAR,
            payload: producto
        })
    }
}

//Ediar registro en la API
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch({
            type: COMENZAR_EDICION_PRODUCTO
        })
        try{
            const res = await clienteAxios.put(`/productos/${producto.id}`, producto)
            console.log(res)
            dispatch({
                type: PRODUCTO_EDITADO_EXITO,
                payload: producto
            })
        }catch (e) {
            dispatch({
                type: PRODUCTO_EDITADO_ERROR
            })
            
        }
    }
}