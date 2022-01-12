import React, { Component } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import { Hasil, ListCategories, NavbarComponent, Menus } from "./components";
import { API_URL } from "./utils/constants";
import axios from 'axios';

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      categorieSelected: 'Makanan'
    }
  }

  componentDidMount() {
    axios.get(API_URL + '/products?category.nama=' + this.state.categorieSelected)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(err => {
        console.log(err);
        
      })
  }

  changeCategorie = (value) => {
    this.setState({
      categorieSelected: value,
      menus: []
    })

    axios.get(API_URL + '/products?category.nama=' + value)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(err => {
        console.log(err);
        
    })

  }

  render() { 

    const { menus, categorieSelected } = this.state;

    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories changeCategorie={this.changeCategorie} categorieSelected={categorieSelected} />
              <Col>
                <h4><strong>Daftar Produk</strong></h4>
                <hr />
                <Row>
                  {menus && menus.map(menu => (
                    <Menus 
                      key={menu.id}
                      menu={menu}
                    />
                  ))}
                </Row>
              </Col>
              <Hasil />
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

