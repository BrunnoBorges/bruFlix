import React, { useEffect, useState} from 'react';
import PageDefault from '../../../components/PageDefault';
import {Link, useHistory} from 'react-router-dom';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos'; 
import categoriasRepository from '../../../repositories/categorias'; 


function CadastroVideo() {
  const history = useHistory();
  const [ categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({titulo}) => titulo)
  const {handleChange, formValues} = useForm({
    titulo: '',
    url: '',
    categoria: ''

  });

  useEffect(() => {
    categoriasRepository.getAll().then((categoriasFromServer) => {
      setCategorias(categoriasFromServer);
    })
  }, []);
  console.log(categorias);

    return(
      <PageDefault>
          <h1>Cadastro de Video</h1>

        <form  onSubmit={(event) => {
          event.preventDefault();
          // alert('Videos cadastrados com sucesso!!!')
          const categoriaEscolhida = categorias.find((categoria) => {
            return categoria.titulo == formValues.categoria;
          });

          console.log(categoriaEscolhida);

          videosRepository.create({
            titulo: formValues.titulo,
            url: formValues.url,
            categoriaId: categoriaEscolhida.id,
          }).then(() => {
            console.log('cadastrou com sucesso');
            history.push('/');
          })


          
        }}>
          <FormField 
            label="Tirulo do Video"
            name="titulo"
            value={formValues.titulo}
            onChange={handleChange}
          />

          <FormField 
            label="URL"
            name="url"
            value={formValues.url}
            onChange={handleChange}
          />

          <FormField 
            label="Categoria"
            name="categoria"
            value={formValues.categoria}
            onChange={handleChange}
            suggestions={categoryTitles}
          />


          <Button type="submit">
            Cadastrar
          </Button>
        </form>





          <Link to="/cadastro/categoria" style={{float: "right"}}>
            Cadastrar Categoria
          </Link>
      </PageDefault>
    )
}

export default CadastroVideo;

