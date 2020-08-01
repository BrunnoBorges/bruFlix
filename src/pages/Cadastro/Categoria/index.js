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
    const URL_TOP = 'http://localhost:8080/categorias';
    setTimeout(() => {
      fetch(URL_TOP).then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCategorias([...resposta]);
      })
    }, 5 * 1000)
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
              <div id="loader-wrapper" class="loading">
                <div class="loader">
                  <div class="line"></div>
                  <div class="line"></div>
                  <div class="line"></div>
                  <div class="line"></div>
                  <div class="line"></div>
                  <div class="line"></div>
                  <div class="subline"></div>
                  <div class="subline"></div>
                  <div class="subline"></div>
                  <div class="subline"></div>
                  <div class="subline"></div>
                  <div class="loader-circle-1"><div class="loader-circle-2"></div>
                    </div>
                  <div class="needle"></div>
                  <div class="loading">Loading</div>
                </div>
              </div>
            </div>
         )} 

      </PageDefault>
    )
}

export default CadastroCategoria;