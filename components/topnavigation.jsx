import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
export class TopNavigation extends React.Component {
	render() {
		var signin = {
			display:'block'
		}

		var signup = {
			display:'none'
		}

		return (

							<nav className="navbar navbar-inverse navbar-fixed-top">
							  <div className="container-fluid">
							   <div className="navbar-header">
					            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
							        <span className="icon-bar"></span>
							        <span className="icon-bar"></span>
							        <span className="icon-bar"></span>                        
							    </button>
					      <a className="navbar-brand" href="#"><span className="glyphicon glyphicon-film logoico"></span> <span className="logo">Bookmy Movie</span></a>
					    </div>
					    <div className="collapse navbar-collapse" id="myNavbar">
					    <ul className="nav navbar-nav">
					      <li><Link to="/" activeClassName='active'>Home</Link></li>
					     <li><Link to="/movies" activeClassName='active'>UpComing Movies</Link></li>
					    </ul>
					    <ul className="nav navbar-nav navbar-right">
					      <li id="signin" style= {sessionStorage.getItem('useroth') ? signup : signin}  onClick = {this.signupModal.bind(this)}><a href="#"><span className="glyphicon glyphicon-list"></span> Sign Up</a></li>
					      <li id="userlog" onClick = {this.loginModal.bind(this)}><a href="#"><span className={sessionStorage.getItem('useroth') ? "glyphicon glyphicon-log-out":"glyphicon glyphicon-log-in"} ></span><span id="userac">{sessionStorage.getItem('useroth')?' Logout':' Login'}</span> </a></li>
					      <li id="username" ><a href="#"><span className="glyphicon glyphicon-user"></span><span id="userprofile"> {sessionStorage.getItem('username')}</span></a></li>
					    </ul>
					    </div>
					  </div>
					</nav>

		);
	}
	loginModal(a){ 

		if($('#userlog a span:first-child').hasClass('glyphicon-log-out')){
			window.sessionStorage.clear();
			$('#userlog a span:first-child').removeClass('glyphicon-log-out');
			$('#userlog a span:first-child').addClass('glyphicon-log-in');
			$('#userac').text(' Login');
			$('#userprofile').text('');
			$('#signin').show();
        	// $('#username').hide();
		}else{
		$('.signup').removeClass('active');
		$('#signup').hide();
		$('.login').addClass('active');
		$('#login').show();
		$('#modal1').modal();
	}
		

	}
	signupModal(a){

		var formData = document.signupform;
		formData.fname.value = '';
    	formData.lname.value = '';
    	formData.email.value = '';
    	formData.pass.value = '';
		$('.login').removeClass('active');
		$('#login').hide();
		$('.signup').addClass('active');
		$('#signup').show();
		$('#modal1').modal();

	}
}


export default TopNavigation;
