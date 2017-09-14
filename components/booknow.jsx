import React, { Component, PropTypes } from 'react';
import Header from '../components/header.jsx';
import Login from '../components/login.jsx';
import Footer from '../components/footer.jsx';



class BookNow extends Component {
    constructor(props) {
        super(props);
        console.log("Book now")
    }

    render() {
        return (
           <div>
           <Header />
           	<p>Book Now</p>
           	<Footer /> 
      		<Login />
           </div> 
        );
    }
}

export default BookNow;
