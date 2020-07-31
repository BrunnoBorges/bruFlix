import React, {useState} from 'react';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';


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
            type=""
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

            {/* <div>      
              <label>
                Descrição
                <textarea
                  type="text"
                  value={formValues.descricao}
                  name="descricao"
                  onChange={handleChange}
                />
              </label>
            </div> */}

            {/* <div>
              <label>
                Cor
                <input
                  type="color"
                  value={formValues.cor}
                  name="cor"
                  onChange={handleChange}
                />
              </label>
            </div> */}
            <ul>
              {categorias.map((categoria, indice) => {
                return(
                  <li key={`${categoria}${indice}`}>
                    {categoria.nome}
                  </li>
                )
              })}
            </ul>
            <button>
              Cadastrar
            </button>
          </form>
      </PageDefault>
    )
}

export default CadastroCategoria;