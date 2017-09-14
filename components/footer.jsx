import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <div className="col-md-12 footer-cont">
      	<div className="col-md-6">Copyright 2017 © bookmymovies Entertainment Pvt. Ltd. All Rights Reserved.</div>
      	<div className="col-md-6">
      		<ul id="foot-nav">
      			<li><a href="#">home</a></li>
      			<li><a href="#">movies</a></li>
      			<li><a href="#">shows</a></li>
      			<li><a href="#">events</a></li>
      			<li><a href="#">TRAILER VIDEOS</a></li>
      		</ul>
      	</div>
      </div>
    );
  }
}
