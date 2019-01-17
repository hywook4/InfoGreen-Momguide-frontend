import React from 'react';
import './MainPage.css';
import {Header} from './content/header/Header';
import {Slider} from './content/slider/Slider';
import {Footer} from './content/footer/Footer';
import Search from './content/search/Search';
import {Category} from './content/navigation/category/Category';
import {Events} from './content/navigation/events/Events';
import {Login} from './content/navigation/login/Login';
import {Signup} from './content/navigation/signup/Signup';
import {Request} from './content/navigation/request/Request';
import {TipEvent} from './content/tipEvent/TipEvent';
import {Tips} from './content/navigation/tips/Tips';
import {Product} from './content/product/Product';
import {LoggedIn} from './content/navigation/request/loggedIn/LoggedIn';
import {RequestComment} from './content/navigation/request/requestComment/RequestComment';
import {ViewMore} from './common/ViewMore/ViewMore';
import {ProdSpec as ProductSpecification} from './content/product/prodSpec/ProdSpec';
import {About} from './content/navigation/about/About';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

const renderHome=()=>{
    return (
        <React.Fragment>
            <Slider/>
            <Search />
            <Product/>
            <TipEvent/>
        </React.Fragment>
    )
}

export const MainPage = ()=>{
    return(
        
        <div className="full_main_page">
            <div className="main_inner">
                <div className="main_inner_row row">
                    <div className="col-lg-12 col-md-12 col-sm-12 main_inner_col">
                        <Router>
                            <React.Fragment>
                                <Header/>
                                
                                <div>
                                    <Switch>
                                        <Route exact path="/" component={renderHome} />
                                        <Route path="/about" component={About} />
                                        <Route path="/category" render={(props) => <Category {...props} />} /> />
                                        <Route path="/category/:search" render={(props) => <Category {...props} />} /> />
                                        <Route exact path="/request" component={Request} />
                                        <Route path="/signup" component={Signup} />
                                        <Route exact path="/login" component={Login} />
                                        <Route exact path="/events" component={Events} />
                                        <Route path="/events/:id" render={(props) => <ViewMore {...props} section={"events"} />} />
                                        <Route exact path="/tips" component={Tips} />
                                        <Route path="/tips/:id" render={(props) => <ViewMore {...props} section={"tips"} />} />

                                        <Route path="/product-details/:name" component={ProductSpecification} />
                                        <Route path="/request/request-comment" component={RequestComment} />
                                        <Route path="/request/loggedin" component={LoggedIn} />
                                    </Switch>
                                </div>
                            </React.Fragment>
                        </Router>
                    <Footer/>
                    </div>
                </div>
            </div>
        </div>
    )
};