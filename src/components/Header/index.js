import React, { Component } from 'react';
import './index.css';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      listHeroesSearch: [],
      iconSearchMobile: 'fa-search',
      openSearchMobile: '',
      value: '',
      isError: false
    }
  }
  

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }
  
  handleSearchMobile = () => {
    this.state.iconSearchMobile === 'fa-search' ? this.setState({iconSearchMobile: 'fa-times'}) : this.setState({iconSearchMobile: 'fa-search'});
    this.state.openSearchMobile === '' ? this.setState({openSearchMobile: 'search-field--open'}) : this.setState({openSearchMobile: ''});
    this.setState({value: ''})
  }

  render(){
    return (
      <header className="header">
        <div className="wrap">
          <div className="header__box">
            <div className="header__box__logo">
              <a href='./'><h1 className="header__box__logo--logo">Stone Age <strong>Heroes</strong></h1></a>
            </div>
            <div className="header__box__search">
              <div className="header__search">
                <i className={`fa ${this.state.iconSearchMobile} search--mobile`} aria-hidden="true" onClick={this.handleSearchMobile}></i>
                <div className={`search-field ${this.state.openSearchMobile}`}>
                  <input type="search" placeholder="Pesquisar..." className="search-field__input" value={this.state.value} onChange={this.handleChange} />
                  <div className="search-field__icon-container" onClick={this.props.handleSearch.bind(this, this.state.value)}>
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </div>
                </div>
                {this.props.isEmpty &&
                  <div className="header__search__error">
                    <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> Preencha este campo.
                  </div>
                }
                
              </div>
              <div className="header__box__theme">
                <i className="fa fa-sun-o" aria-hidden="true" onClick={this.props.changeTheme}></i>
                <i className="fa fa-moon-o" aria-hidden="true" onClick={this.props.changeTheme}></i>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;