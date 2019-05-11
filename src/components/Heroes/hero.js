import React, { Component } from 'react';
import Client from '../../services/client'; 
import './hero.css';

class Hero extends Component {
    constructor(){
        super();
        this.state = {
            activeTab: '1',
            biography: {},
            appearance: {},
            power: {},
            work: {},
            connections: {},
            openMenu: ''
        }
    }

    handleClick = (event) => {
        event.preventDefault();
        this.setState({activeTab: event.target.id});
    }

    getBiography = async (atribute) => {
        const response = await Client(`${this.props.idHero}/${atribute}`);
        this.setState({biography: response.data});
    }
    getAppearance = async (atribute) => {
        const response = await Client(`${this.props.idHero}/${atribute}`)
        this.setState({appearance: response.data})
    }
    getPower = async (atribute) => {
        const response = await Client(`${this.props.idHero}/${atribute}`)
        this.setState({power: response.data})
    }
    getWork = async (atribute) => {
        const response = await Client(`${this.props.idHero}/${atribute}`)
        this.setState({work: response.data})
    }
    getConnections = async (atribute) => {
        const response = await Client(`${this.props.idHero}/${atribute}`)
        this.setState({connections: response.data})
    }

    openMenuMobile = () => {
        if(this.state.openMenu === ''){
            this.setState({openMenu: 'open'})
        }else{
            this.setState({openMenu: ''})
        }
        
    }

    componentDidMount(){
        this.getBiography('biography');
        this.getAppearance('appearance');
        this.getPower('powerstats');
        this.getWork('work');
        this.getConnections('connections');
    }

  render(){
    const { hero } = this.props;
    return (
        <div className="content__box-hero">
            <div className="content__box-hero__back">
                <span onClick={this.props.handleBack}><i className="fa fa-arrow-left" aria-hidden="true"></i> Voltar</span>
                <nav className="content__box-hero__menu">
                    <div id="menu-mobile" className={`jmenu-mobile ${this.state.openMenu}`} onClick={this.openMenuMobile}>
                        <span className="burguer"></span>
                        <span className="burguer"></span>
                        <span className="burguer"></span>
                    </div>
                    <ul className={`content__box-hero__menu__list ${this.state.openMenu}`}>
                        <li id="1" className={this.state.activeTab === '1' ? 'active' : ''} onClick={this.handleClick}>Biografia</li>
                        <li id="2" className={this.state.activeTab === '2' ? 'active' : ''} onClick={this.handleClick}>Aparência</li>
                        <li id="3" className={this.state.activeTab === '3' ? 'active' : ''} onClick={this.handleClick}>Poder</li>
                        <li id="4" className={this.state.activeTab === '4' ? 'active' : ''} onClick={this.handleClick}>Trabalho</li>
                        <li id="5" className={this.state.activeTab === '5' ? 'active' : ''} onClick={this.handleClick}>Conexões</li>
                    </ul>
                </nav>
            </div>
            
                    <div className="content__box-hero__parent" key={hero.id}>
                        <div className="content__box-hero__hero-data">
                            <div className="content__box-hero__hero-data--image" style={{background: `url(${hero.image.url}) center center no-repeat`, backgroundSize: 'cover'}}><span>{hero.name}</span></div>
                            
                            <div className="content__box-hero__hero-data__resume">
                                <div className={`content--tab ${this.state.activeTab === '1' ? 'active' : ''}`}>
                                    {
                                        
                                        <div key={this.state.biography.id}>
                                            <h2>Biografia</h2>
                                            <p>
                                                <label>Nome:</label>
                                                <span>{this.state.biography.name}</span>
                                            </p>
                                            <p>
                                                <label>Nome Completo:</label>
                                                <span>{this.state.biography['full-name']}</span>
                                            </p>
                                            <p>
                                                <label>Naturalidade:</label>
                                                <span>{this.state.biography['place-of-birth']}</span>
                                            </p>
                                            <p>
                                                <label>Editora:</label>
                                                <span>{this.state.biography.publisher}</span>
                                            </p>
                                            <p>
                                                <label>Primeira Aparição:</label>
                                                <span>{this.state.biography['first-appearance']}</span>
                                            </p>
                                        </div>
                                    }
                                </div>
                                <div className={`content--tab ${this.state.activeTab === '2' ? 'active' : ''}`}>
                                    <div key={this.state.appearance.id}>
                                        <h2>Aparência</h2>
                                        <p>
                                            <label>Raça:</label>
                                            <span>{this.state.appearance.race}</span>
                                        </p>
                                        <p>
                                            <label>Sexo:</label>
                                            <span>{this.state.appearance.gender}</span>
                                        </p>
                                        {/* <p>
                                            <label>Altura:</label>
                                            <span>{this.state.appearance.height[1]}</span>
                                        </p>
                                        <p>
                                            <label>Peso:</label>
                                            <span>{this.state.appearance.weight[1]}</span>
                                        </p> */}
                                    </div>
                                </div>
                                 <div className={`content--tab ${this.state.activeTab === '3' ? 'active' : ''}`}>
                                    {
                                        <div key={this.state.power.id}>
                                            <h2>Estatísticas de poder</h2>
                                            <p>
                                                <label>Inteligência:</label>
                                                <span>{this.state.power.intelligence}</span>
                                            </p>
                                            <p>
                                                <label>Força:</label>
                                                <span>{this.state.power.strength}</span>
                                            </p>
                                            <p>
                                                <label>Poder:</label>
                                                <span>{this.state.power.power}</span>
                                            </p>
                                            <p>
                                                <label>Combate:</label>
                                                <span>{this.state.power.combat}</span>
                                            </p>
                                            <p>
                                                <label>Velocidade:</label>
                                                <span>{this.state.power.speed}</span>
                                            </p>
                                        </div>
                                    }
                                </div>
                                <div className={`content--tab ${this.state.activeTab === '4' ? 'active' : ''}`}>
                                    {
                                        <div key={this.state.work.id}>
                                            <h2>Trabalho</h2>
                                            <p>
                                                <label>Ocupação:</label>
                                                <span>{this.state.work.occupation}</span>
                                            </p>
                                            <p>
                                                <label>Base:</label>
                                                <span>{this.state.work.base}</span>
                                            </p>
                                        </div>
                                    }
                                </div>
                                <div className={`content--tab ${this.state.activeTab === '5' ? 'active' : ''}`}>
                                    {
                                        <div key={this.state.connections.id}>
                                            <h2>Conexões</h2>
                                            <p>
                                                <label>Afiliados:</label>
                                                <span>{this.state.connections['group-affiliation']}</span>
                                            </p>
                                            <p>
                                                <label>Parentes:</label>
                                                <span>{this.state.connections.relatives}</span>
                                            </p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                
      </div>
    );
  }
}

export default Hero;