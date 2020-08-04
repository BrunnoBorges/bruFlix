import { useState } from 'react';

function useForm(valoresIniciais) {

    const [formValues, setFormValues] = useState(valoresIniciais);
  
    function setValues(chave, valor) {
      setFormValues({
        ...formValues,
        [chave]: valor
      })
    }
  
    function handleChange(infosDoEnveto) {
      setValues(infosDoEnveto.target.getAttribute('name'), 
      infosDoEnveto.target.value);
    }
  
    function clearForm() {
      setValues(valoresIniciais);
    }
  
    return {
      handleChange,
      formValues,
      clearForm
    }
  
}

export default useForm;