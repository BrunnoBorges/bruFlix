import React from 'react';

import Menu from './src/components/Menu/index';
import BannerMain from './src/components/BannerMain/index';
import Carousel from './src/components/Carousel/index';
import dadosIniciais from './src/data/dados_iniciais.json';
import Footer from './src/components/Footer/index';



function Home() {
  return (
    <div style={{background: "#141414"}}>
      <Menu />

      <BannerMain 
        videoTitle={dadosIniciais.categorias[0].videos[0].titulo}
        url={dadosIniciais.categorias[0].videos[0].url}
        videoDescription={"O melhor da comedia, e aqui!!!"}
      />

      <Carousel 
        ignoreFirsVideo
        category={dadosIniciais.categorias[0]}
      />

      <Carousel 
        category={dadosIniciais.categorias[1]}
      />

      <Carousel 
        category={dadosIniciais.categorias[2]}
      />

      <Carousel 
        category={dadosIniciais.categorias[3]}
      />

      <Carousel 
        category={dadosIniciais.categorias[4]}
      />

      <Footer />
    </div>
  );
}

export default Home;
