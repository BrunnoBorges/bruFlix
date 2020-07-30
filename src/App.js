import React from 'react';

import Menu from './components/menu/index';
import BannerMain from './components/BannerMain/index';
import Carousel from './components/Carousel/index'
import dadosIniciais from './data/dados_iniciais.json';



function App() {
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
    </div>
  );
}

export default App;
