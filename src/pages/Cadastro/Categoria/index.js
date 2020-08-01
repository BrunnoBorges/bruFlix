import React, {useState, useEffect} from 'react';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import './categoria.css';


function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: ''
  }
  const [categorias, setCategorias] = useState([]);
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
          <h1>Cadastro de Categoria: {formValues.nome}</h1>
          <form onSubmit={function handleSubmit(infosDoEnveto) {
            infosDoEnveto.preventDefault();
            setCategorias([
              ...categorias, 
              formValues
            ]);

            setFormValues(valoresIniciais);
          }}>
            <FormField 
            type="text"
            label="nome"
            name="nome"
            value={formValues.nome}
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
            <ul>
              {categorias.map((categoria) => {
                return(
                  <li key={`${categoria.nome}`}>
                    {categoria.nome}
                  </li>
                )
              })}
            </ul>
            <Button>
              Cadastrar
            </Button>
          </form>

         {categorias.length === 0 && (
            <div>
              <div id="loader-wrapper" className="loading">
                <div className="loader">
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="subline"></div>
                  <div className="subline"></div>
                  <div className="subline"></div>
                  <div className="subline"></div>
                  <div className="subline"></div>
                  <div className="loader-circle-1"><div className="loader-circle-2"></div>
                    </div>
                  <div className="needle"></div>
                  <div className="loading">Loading</div>
                </div>
              </div>
            </div>
         )} 

      </PageDefault>
    )
}

export default CadastroCategoria;