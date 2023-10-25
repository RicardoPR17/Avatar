import React from 'react'
import logo from '../../images/Logo.png'
import '../../components/Menu/Menu.css'

const Menu = () => {
    return (
        <div className='container-menu'>
            <div className='row'>
                <div className='col-auto co-sm-2 d-flex flex-column justify-content-between min-vh100 menu'>
                    <div>
                        <a className='text-decoration-none ms-4 d-flex align-items-center text-white d-none d-sm-inline'>
                            <img src={logo}/>
                        </a>
                        <hr className='text-white d-none d-sm-block'></hr>
                        <ul class="nav nav-pills flex-column" id='parentM'>
                            <li class="nav-item text-white my-1">
                                <a href="#" class="nav-link " aria-current="page">
                                    <i className='bi bi-cash-coin'></i>
                                    <span className='ms-2 text-white'>Cryptos</span>
                                </a>
                            </li>
                            <li class="nav-item text-white my-1">
                                <a href="#" class="nav-link " aria-current="page">
                                    <i className='bi bi-shop'></i>
                                    <span className='ms-2 text-white'>Buy Crypto</span>
                                </a>
                            </li>
                            <li class="nav-item text-white my-1">
                                <a href="#" class="nav-link " aria-current="page">
                                    <i className='bi bi-cart-fill'></i>
                                    <span className='ms-2 text-white'>Sell Crypto</span>
                                </a>
                            </li>
                            <li class="nav-item text-white my-1">
                                <a href="#" class="nav-link " aria-current="page">
                                    <i className='bi bi-wallet2'></i>
                                    <span className='ms-2 text-white'>Wallet</span>
                                </a>
                            </li>
                            <li class="nav-item text-white my-1">
                                <a href="#" class="nav-link " aria-current="page">
                                    <i className='bi bi-toggle2-off'></i>
                                    <span className='ms-2 text-white'>Log out</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <a class="btn btn-primary text-white" type="button" id="triggerId" aria-haspopup="true"
                                aria-expanded="false">
                                    <i className='bi bi-person fs-4'></i><span className='fs-4 ms-3'>Profile</span>
                                </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu