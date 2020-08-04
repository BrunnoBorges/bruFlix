import React, {useEffect, useState} from 'react';

import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import categoriasRepository from '../../repositories/categorias';
import PageDefault from '../../components/PageDefault';
import Loading from '../../components/Loading';

  // http://localhost:8080/categorias?_embed=videos

function Home() {

  const [ dadosIniciais, setDadosIniciais] = useState([]) 

  useEffect(() => {
    categoriasRepository.getAllWithVideos()
    .then((categoriasComVideos) => {

      setDadosIniciais(categoriasComVideos);
    })
    .catch((erro) => {
      console.log(erro);
      alert('sorry, sistema indisponivel no momento :(')
    })
  }, []);

  return (
    <PageDefault paddingAll={0}>

      {dadosIniciais.length === 0 && (<div> <Loading /> </div>)}
      
      {dadosIniciais.map((categoria, indice) => {
        if (indice === 0) {
          return (
            <div key={categoria.id}>
              <BannerMain
                videoTitle={dadosIniciais[0].videos[0].titulo}
                url={dadosIniciais[0].videos[0].url}
                videoDescription={dadosIniciais[0].videos[0].description}
              />
              <Carousel
                ignoreFirstVideo
                category={dadosIniciais[0]}
              />
            </div>
          );
        }

        return (
          <Carousel
            key={categoria.id}
            category={categoria}
          />
        );
      })}
      </PageDefault>
  );
}

export default Home;
