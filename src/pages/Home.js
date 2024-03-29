import React, { Component } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../components";
import { API_URL } from "../utils/constants";
import axios from 'axios';
import swal from 'sweetalert';

export default class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      categorieSelected: 'Makanan',
      keranjangs: [],
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

    axios.get(API_URL + '/keranjangs')
      .then(res => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch(err => {
        console.log(err);
    })

  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.keranjangs !== prevState.keranjangs) {
      axios.get(API_URL + '/keranjangs')
        .then(res => {
          const keranjangs = res.data;
          this.setState({ keranjangs });
        })
        .catch(err => {
          console.log(err);
      })
    }
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

  masukKeranjang = (value) => {

    axios.get(API_URL + '/keranjangs?product.id=' + value.id)
      .then(res => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            totalHarga: value.harga,
            product: value
          }

          axios.post(API_URL + '/keranjangs', keranjang)
            .then(res => {
              swal({
                title: "Success",
                text: "Succes put your order " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 2000
              });
            })
            .catch(err => {
              console.log(err);

          })
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            totalHarga: res.data[0].totalHarga + value.harga,
            product: value
          }

          axios.put(API_URL + '/keranjangs/'+ res.data[0].id, keranjang)
          .then(res => {
            swal({
              title: "Success",
              text: "Succes put your order " + keranjang.product.nama,
              icon: "success",
              button: false,
              timer: 2000
            });
          })
          .catch(err => {
            console.log(err);
          })
        }
      })
      .catch(err => {
        console.log(err);

      })


  }

  render() {
    const { menus, categorieSelected, keranjangs } = this.state;

    return (
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
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs}/>
            </Row>
          </Container>
        </div>
    )
  }
}

