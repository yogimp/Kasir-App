import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons'

const Icon = ({nama}) => {
    if(nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className='me-3' />

    if(nama === "Minuman") return <FontAwesomeIcon icon={faCoffee}  className='me-2' />

    if(nama === "Cemilan") return <FontAwesomeIcon icon={faCheese}  className='me-3' />
    
    return <FontAwesomeIcon icon={faUtensils}  className='me-2' />
}

export default class ListCategories extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get(API_URL + '/categories')
            .then(res => {
                const categories = res.data;
                this.setState({ categories });
            })
            .catch(err => {
                console.log(err);

            })
    }

    render() {
        const { categories } = this.state;
        const {changeCategorie, categorieSelected} = this.props;

        return (
            <Col md={2} mt="2">
                <h4><strong>Daftar Kategori</strong></h4>
                <hr />
                <ListGroup>
                    {categories && categories.map(category => (
                        <ListGroup.Item key={category.id} onClick={() => changeCategorie(category.nama)} className={categorieSelected === category.nama && "category-aktif"} style={{ cursor: 'pointer' }}>
                            <h5>
                                <Icon nama={category.nama} />
                                {category.nama}
                            </h5>
                        </ListGroup.Item>    
                    ))}
                </ListGroup>
            </Col>
        )
    }
}
