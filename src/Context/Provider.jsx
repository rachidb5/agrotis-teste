import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
    const [propriedade, setPropriedade] = useState({});
    const [validate, setValidate] = useState(false);
    const [snack, setSnack] = useState({
      open: false,
      vertical: "bottom",
      horizontal: "center",
    });
    const [success, setSuccess] = useState(false);
    const [cnpj, setCnpj] = useState("");
    const [laboratorio, setLaboratorio] = useState({});
    const [values, setValues] = useState({
      observacoes: "",
      nome: "",
      dataInicial: "",
      dataFinal: "",
    });
  
   
    const context = {
      propriedade,
      setPropriedade,
      validate,
      setValidate,
      snack,
      setSnack,
      success,
      setSuccess,
      cnpj,
      setCnpj,
      laboratorio,
      setLaboratorio,
      values,
      setValues
    };
    return (
        <Context.Provider value={ context }>
          { children }
        </Context.Provider>
      );
}

export default Provider;