import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
    const [propriedade, setPropriedade] = useState({});
    const [dateMessage, setDateMessage] = useState('Preencha a data final')
    const [errorMessage, setErrorMessage] = useState('Preencha os campos obrigatórios.')
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
    const [dateVerify, setDateVerify] = useState(false)
  
   
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
      setValues,
      dateVerify,
      setDateVerify,
      dateMessage,
      setDateMessage,
      errorMessage,
      setErrorMessage
    };
    return (
        <Context.Provider value={ context }>
          { children }
        </Context.Provider>
      );
}

export default Provider;