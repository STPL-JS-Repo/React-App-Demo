import React from 'react';

import TopNavigation from '../components/topnavigation.jsx';
class Header extends React.Component {

   render() {
      return (

         <header>
   			<TopNavigation />
   			<Banner />
         </header>
      );

   }
   }


class Banner extends React.Component {
 render() {
  	return (
  		<div className="col-md-12 banner">
			<img src="images/crewn.jpg" />
		</div>
  	);
  } 
}
export default Header;
