import React from 'react';
import Header from '../components/header.jsx';
import Login from '../components/login.jsx';
import Footer from '../components/footer.jsx';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

class AppView extends React.Component {
	
	constructor(props) {
	console.log("AppView")
      super(props);
      this.state = {data:[]}
   };

	render() {
	
		return (
			<div>
			<Header />
			<div className="col-md-12 ">
			<div className="apptitle">
				<h2>Latest Movies</h2>
			</div> 
			<div className="col-md-12 appview">
			{this.state.data.map((dnyCont, i)=>	<AppMovies key = {i} componentData = {dnyCont} />)}
			</div> 
			</div>
			<Footer /> 
      		<Login />
			</div>
		);
	};

	 componentWillMount(){
    let ref = firebase.database().ref('movies/');
    	ref.on('value', snapshot => {
    		console.log(snapshot.val())
     		 this.setState({ data:snapshot.val() });
    	})
  }
}

class AppMovies extends React.Component {

  render() {
  	var imgPath = "images/movie/";
  	var tagsProps = this.props.componentData.tags;
  	var tags = tagsProps.split(',');
  	var rating = -(this.props.componentData.rating*2*16)+"px";
  	var ratingStyle= {
  		backgroundPositionY: rating
  	}
     return (
      <div className="col-md-3 movie-cont">
      	<div className="poster">
      		
      		<img src={imgPath+this.props.componentData.poster} className="img-responsive" />
      		<a href="#" data-movie={this.props.componentData.name} onClick={this.movieDetails.bind(this)}>
      			<div className="register">Details</div>
          }
      		</a>
      	</div>
      	<div className="movie-details">
      		<div className="movie-title"><a href="#">{this.props.componentData.name}</a></div>
      		<div className="movie-rating"><div className="rating" style={ratingStyle}></div></div>
      		<div className="movie-lang">{this.props.componentData.lang}</div>
      		<div className="movie-tags">{tags.map((com, i)=><span key={i} className="tags">{com}</span> )}</div>
      		<div className="booknow"><a href="#" onClick={this.bookNow.bind(this)}>Book Now</a></div>
      	</div>
      </div>
    );
  }
  bookNow(_this, name){
  	console.log("Book Now");
  	browserHistory.push('/booknow');
  	return false;
  }
  movieDetails(_this){
    console.log(this.props.componentData.name);
  	browserHistory.push('/details?movie='+this.props.componentData.name);
  	return false;
  }
}

export default AppView;