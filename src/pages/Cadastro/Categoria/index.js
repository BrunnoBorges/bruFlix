import React, {useState, useEffect} from 'react';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import Loading from '../../../components/Loading';


function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: ''
  }

  const {handleChange, formValues, clearForm} = useForm(valoresIniciais)

  const [categorias, setCategorias] = useState([]);
  

  useEffect(() => {
    const URL_TOP = window.location.hostname.includes('localhost') 
    ? 'http://localhost:8080/categorias' 
    : 'https://bru-flix.herokuapp.com/categorias';
    setTimeout(() => {
      fetch(URL_TOP)
        .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCategorias([
          ...resposta,
        ]);
      })
    }, 4 * 1000)
  }, [
    
  ])

  
    return(
      <PageDefault>
          <h1>Cadastro de Categoria: {formValues.titulo}</h1>
          <form onSubmit={function handleSubmit(infosDoEnveto) {
            infosDoEnveto.preventDefault();
            setCategorias([
              ...categorias, 
              formValues
            ]);

            clearForm();
          }}>
            <FormField 
            type="text"
            label="Titulo"
            name="titulo"
            value={formValues.titulo}
            onChange={handleChange}
            />

            <FormField 
            type="textarea"
            label="descricao"
            name="descricao"
            value={formValues.descricao}
            onChange={handleChange}
            />

            <FormField 
            type="color"
            label="cor"
            name="cor"
            value={formValues.cor}
            onChange={handleChange}
            />
              <h1>Categorias Cadastradas:</h1>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <ul>
                {categorias.map((categoria) => {
                  return(
                    <li key={`${categoria.titulo}`}>
                      {categoria.titulo}
                    </li>
                  )
                })}
              </ul>
             <div>
                <Button>
                  Cadastrar nova categoria
                </Button>
              </div> 
            </div>
          </form>

         {categorias.length === 0 && (
            <div>
              <Loading />
            </div>
         )} 

      </PageDefault>
    )
}

export default CadastroCategoria;