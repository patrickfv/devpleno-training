import React from 'react'

const data = [ 
{
  title: 'devReactJS',
  info: 'Conhecimento premium e direto do campo de batalha nacional e internacional para desenvolvedores de todos os níveis alcançarem seus objetivos na profissão.',
  logo: 'https://images.prismic.io/devpleno/9c43fadf-2aac-4fb6-b75e-c3d8d805eba8_devReact.png?auto=format%2Ccompress&rect=0%2C0%2C406%2C406&w=320&h=320&fit=max&q=50&dpr=1',
  link: 'https://lp.devpleno.com/devreactjs/'
},
{
  title: 'Bootstrap',
  info: 'Get started with Bootstrap, the world’s most popular framework for building responsive, mobile-first sites, with jsDelivr and a template starter page.',
  logo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdotnetnuke.nl%2FPortals%2F16%2FEasyDNNnews%2F18%2Fbootstrap-social-logo.png&f=1&nofb=1',
  link: 'https://getbootstrap.com/docs/4.5/getting-started/introduction/'
}, 
{
  title: 'Reactstrap',
  info: 'Easy to use React Bootstrap 4 components',
  logo: 'https://reactstrap.github.io/assets/logo.png',
  link: 'https://reactstrap.github.io/'
}, 
{
  title: 'React',
  info: 'A JavaScript library for building user interfaces',
  logo: 'https://cdn.idevie.com/wp-content/uploads/2015/12/React.js_logo.svg_.png',
  link: 'https://reactjs.org/'
}]
  
const HeaderHome = () => {
  return (
    <header className='jumbotron my-4'>
      <h1>Minhas Séries Favoritas</h1>
      <p className='lead'>
        Projeto direto do curso devReactJS da DevPleno, onde coloco em prática meus estudos do curso com tecnologias de front-end como React, Bootstrap e Reactstrap, tudo com JavaScript. 
      </p>
      <a className='btn btn-primary btn-lg' href='https://devpleno.com/'>Acesse DevPleno</a>
    </header>
  )
}

const Card = ({ logo, title, info, link }) => {
  return (
    <div className='col-lg-3 col-md-6 mb-4'>
      <div className='card h-100'>
        <img className='card-img-top' src={logo} alt=''/>
        <div className='card-body'>
          <h4 className='card-title'>{title}</h4>
          <p className='card-text'>{info}</p>
        </div>
        <div className='card-footer'>
          <a className='btn btn-primary' href={link}>Ver Mais</a>
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  return (
    <div className='container'>
      <HeaderHome/>
      <div className='row text-center'>
        { data.map(each => <Card {...each} />) }
      </div>
    </div>
  ) 
}

export default Home