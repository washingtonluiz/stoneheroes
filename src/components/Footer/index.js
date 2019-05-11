import React, { Component } from 'react';
import './index.css';

class Footer extends Component {
  render(){
    return (
      <footer className="footer">
        <div className="wrap">
            <p className="footer__copyright">© Stone Age Heroes 2019 <span>-</span> <span>Todos os direitos reservados</span></p>
        </div>
      </footer>
    );
  }
}

export default Footer;