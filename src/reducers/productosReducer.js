import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGAR_PRODUCTOS_EXITO,
    DESCARGAR_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR, COMENZAR_EDICION_PRODUCTO
} from '../types'

//Cada reducer tiene su propio state
const initialState = {
    productos: [],
    error: null,
    loading: false,
    productoEliminar: null,
    productoAgregado: null,
    productoEditar: null
}

const productosReducer = (state = initialState, action)=>{
    switch (action.type){
        case COMENZAR_EDICION_PRODUCTO:
            return {
                ...state,
                loading: true
            }
        case PRODUCTO_EDITADO_EXITO:
            return {
                ...state,
                productoEditar: null,
                productos: state.productos.map(producto =>
                    producto.id === action.payload.id ? producto = action.payload : producto
                )
            }
        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                productoEditar: action.payload
            }
        case PRODUCTO_ELIMINADO_EXITO:
            return {
                ...state,
                productos: state.productos.filter(producto => producto.id !== state.productoEliminar),
                productoEliminar: null
            }
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoEliminar: action.payload
            }
        case DESCARGAR_PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                productos: action.payload
            }
        case COMENZAR_DESCARGA_PRODUCTOS:
            return {
                ...state,
                loading: action.payload,
                productoAgregado: null
            }
        case AGREGAR_PRODUCTO_ERROR:
        case DESCARGAR_PRODUCTOS_ERROR:
        case PRODUCTO_ELIMINADO_ERROR:
        case PRODUCTO_EDITADO_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: [...state.productos, action.payload],
                productoAgregado:true
            }
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}

export default productosReducer

