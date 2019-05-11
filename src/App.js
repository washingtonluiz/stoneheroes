import React, { Component } from 'react';
import Client from './services/client';
import './App.css';

import Header from './components/Header';
import Heroes from './components/Heroes';
import Hero from './components/Heroes/hero';
import Footer from './components/Footer';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      theme: 'theme--light',
      isLoading: true,
      showListHeroes: true,
      listHeroes: [],
      showHero: false,
      hero: {},
      idHero: '',
      errorSearch: false,
      listSearch: [],
      showListSearch: false,
      isEmpty: false
    }
  }

  changeTheme = () => {
    this.state.theme === 'theme--light' ? this.setState({theme: 'theme--dark'}) : this.setState({theme: 'theme--light'});
  }

  handleBack = () =>{
    this.setState({showHero: false, hero: {}, showListHeroes: true, listSearch: []});
  }

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  queryClient = async() => {
    let array = [];
    for(let i=1; i<= 5;i++){
      const response = await Client(`${this.getRandomInt(1, 732)}`);
      array.push(response.data);
    }
    this.setState({listHeroes: [...this.state.listHeroes, ...array], isLoading: false});
  }

  handleInfoHero = async (id) => {
    this.setState({isLoading: true});
    const response = await Client(`${id}`);
    this.setState({hero: response.data, idHero: id, showHero: true, showListHeroes: false, showListSearch: false, isLoading: false});
  }

  handleSearch = async (valueSearch) => {
    if(valueSearch === ''){
      this.setState({isEmpty: true});
      setTimeout(() => {
        this.setState({isEmpty: false});
      }, 7000)
    }else{
      this.setState({showListHeroes: false, isLoading: true, showHero: false});
      const response = await Client(`search/${valueSearch}`)
      if(response.data.response === 'success'){
        this.setState({listSearch: response.data.results, showListSearch: true, isLoading: false, listHeroes: [...this.state.listHeroes, ...response.data.results]})
      }else{
        this.setState({errorSearch: true, isLoading: false, showListHeroes: true, showHero: false});
        setTimeout(() =>{
          this.setState({errorSearch: false})
          document.querySelector('.search-field__input').value = '';
        },7000)
      }
    }
  }

  componentDidMount(){
    this.queryClient();
  }
  render(){
    const {isLoading, listHeroes, hero, showListHeroes, showHero, showListSearch, listSearch} = this.state;
    return (
      <div className={`content ${this.state.theme}`}>
        <Header changeTheme={this.changeTheme} handleSearch={this.handleSearch} isEmpty={this.state.isEmpty} />
          <div className="content__box-heroes">
            <div className="wrap">
              <h1 className="content--titulo">Conheça alguns dos super-heróis do universo</h1>
              <p className="content--subtitulo">Saiba as estatísticas de poder, biografia, aparência, trabalho, conexões e imagens</p>
              {isLoading && 
                <div className="box-loader">
                  <div className="bar">
                    <div className="circle"></div>
                    <p>Loading</p>
                  </div>
                </div>
              }

              {this.state.errorSearch &&
                  <div className="alert alert-warning">
                    Erro ao pesquisar. O herói não existe ou o nome está incorreto.
                  </div>
              }

              {!isLoading && showListSearch &&
                <Heroes arrayMap={listSearch} handleInfoHero={this.handleInfoHero.bind(this)} />
              }

              {!isLoading && showListHeroes &&
                <Heroes arrayMap={listHeroes} handleInfoHero={this.handleInfoHero.bind(this)} />
              }

              {showHero &&
                <Hero hero={hero} idHero={this.state.idHero} handleBack={this.handleBack} />
              }

              {}
            </div>
          </div>
        <Footer />
      </div>
    );
  }
}

export default App;
