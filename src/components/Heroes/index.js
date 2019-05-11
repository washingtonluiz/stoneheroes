import React, { Component } from 'react';
import './index.css';
import noImage from './img/no-image.png';

class Heroes extends Component {
    constructor(){
        super();
        this.state = {
            iconHeart: 'fa-heart-o',
            heroesFavorites: [],
        }
    }

    setFavorite = (id) => {
        let index = this.state.heroesFavorites.indexOf(id);
        if(this.state.heroesFavorites.includes(id)){
            this.state.heroesFavorites.splice(index, 1);
            this.setState({heroesFavorites: this.state.heroesFavorites});
        }else{
            this.setState({heroesFavorites: [...this.state.heroesFavorites, id]});
        }
    }
  
  render(){
    return (
        <ul className="list-heroes">
            {
            this.props.arrayMap.map(item => {
                return (
                    <li className="list-heroes__item" key={item.name}>
                        <div className="list-heroes__item__box-image" onClick={ ()=> this.props.handleInfoHero(item.id)} style={{background: `url(${noImage}) center center no-repeat`, backgroundSize: 'cover'}}>
                            <div className="list-heroes__item__image" style={{background: `url(${item.image.url}) center center no-repeat`, backgroundSize: 'cover'}}></div>
                        </div>
                        <div className="list-heroes__item__box-data">
                            <div>
                                <h2>{item.name}</h2>
                                <span className="list-heroes__item--favorite" onClick={this.setFavorite.bind(this, item.id)}><i className={this.state.heroesFavorites.includes(item.id) ? 'fa fa-heart' : 'fa fa-heart-o'} aria-hidden="true"></i></span>
                            </div>
                            {item.appearance.race === 'null' ? (
                                <h3><span>Raça: </span> <span>Indefinida</span></h3>
                            ):(
                                <h3><span>Raça: </span> <span>{item.appearance.race}</span></h3>
                            )

                            }
                        </div>
                    </li>
                )
            })
            }
        </ul>
    );
  }
}

export default Heroes;