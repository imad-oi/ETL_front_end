"use client"

import { useReducer } from 'react'
import {createContext,  useContext} from 'react'

const StoreContext = createContext()

const initialState = {
    excel : {
        colonnes : [],
        colonnesTriees : [],
        fichier : null,

    },
    config : {
        colonnes : [],
        fichier : null,
    },
    tableJointure : {
        data : [],
    },
    db:{
        colonnes : [],
    }
}

const actionsType = {
    SET_EXCEL : 'SET_EXCEL',
    SET_CONFIG : 'SET_CONFIG',
    SET_TABLE_JOINTURE : 'SET_TABLE_JOINTURE',
    SET_EXCEL_COLONNES : 'SET_EXCEL_COLONNES',
    SET_CONFIG_COLONNES : 'SET_CONFIG_COLONNES',
    SET_DB_COLONNES : 'SET_DB_COLONNES',
    SET_EXCEL_COLONNES_TRIEES : 'SET_EXCEL_COLONNES_TRIEES',
}

const reducer = (state, action) => {
    switch(action.type){
        case actionsType.SET_EXCEL:
            return {...state, excel : action.payload}
        case actionsType.SET_CONFIG:
            return {...state, config : action.payload}
        case actionsType.SET_TABLE_JOINTURE:
            return {...state, tableJointure : action.payload}
        case actionsType.SET_EXCEL_COLONNES:
            return {...state, excel : {...state.excel, colonnes : action.payload}}
        case actionsType.SET_CONFIG_COLONNES:
            return {...state, config : {...state.config, colonnes : action.payload}}
        case actionsType.SET_DB_COLONNES: 
            return {...state, db : {...state.db, colonnes : action.payload}}
        case actionsType.SET_EXCEL_COLONNES_TRIEES:
            return {...state, excel : {...state.excel, colonnesTriees : action.payload}}
        default:
            return state
    }
}

export const StoreProvider = ({children}) => {
    const [state , dispatch] = useReducer(reducer, initialState);

    const addExcelFile = (file) => {
        dispatch({type : actionsType.SET_EXCEL, payload : {...state.excel, fichier : file}})
    }

    const addConfigFile = (file) => {
        dispatch({type : actionsType.SET_CONFIG, payload : {...state.config, fichier : file}})
    }

    const addTableJointure = (data) => {
        dispatch({type : actionsType.SET_TABLE_JOINTURE, payload : {...state.tableJointure, data : data}})
    }

    const addExcelColonnes = (colonnes) => {
        dispatch({type : actionsType.SET_EXCEL_COLONNES, payload : colonnes})
    }

    const addConfigColonnes = (colonnes) => {
        dispatch({type : actionsType.SET_CONFIG_COLONNES, payload : colonnes})
    }

    const addDbColonnes = (colonnes) => {
        dispatch({type : actionsType.SET_DB_COLONNES, payload : colonnes})
    }

    const updateExcelColonnesTrie = (colonnes) => {
        dispatch({type : actionsType.SET_EXCEL_COLONNES_TRIEES, payload : colonnes})
    }

    const value = {
        state,
        addExcelFile,
        addConfigFile,
        addTableJointure,
        addExcelColonnes,
        addConfigColonnes,
        addDbColonnes,
        updateExcelColonnesTrie,
    }
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}


export const useStore = () => {
    const context = useContext(StoreContext)
    if(context === undefined){
        throw new Error('useStore must be used within a StoreProvider')
    }
    return context
}