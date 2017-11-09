import React, { Component, PropTypes } from 'react';
import Header from '../components/header.jsx';
import Login from '../components/login.jsx';
import Footer from '../components/footer.jsx';
import ReactPlayer from 'react-player';


class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {data:[]}
        console.log("Movies")
    }
componentWillMount(){
    let ref = firebase.database().ref('Upcoming/');
      ref.on('value', snapshot => {
        console.log(snapshot.val())
          this.setState({ data:snapshot.val() });
      })
  }
    render() {
        return (
           <div>
           <Header />
             <div className="col-md-12 ">
      <div className="apptitle">
        <h2>UpComing Movies</h2>
      </div> 
      <div className="col-md-12 appview">
      {this.state.data.map((dnyCont, i)=>  <UpComing key = {i} rowId ={i} componentData = {dnyCont} />)}
      </div> 
      </div>
           	<Footer /> 
      		<Login />
           </div> 
        );
    }

      
}

class UpComing extends React.Component {

  render() {
    var tagsProps = this.props.componentData.tags;
    var tags = tagsProps.split(',');   
    const bannerStyle={
     width: "100%",
     height: "230px",
      };
     return (
      <div className="col-md-3 movie-cont">
        <div className="poster">
          <img src={this.props.componentData.poster} style={bannerStyle} className="img-responsive" />
          <a href="#" onClick={this.videos.bind(this)}>
            <div className="register1" ><img src="images/videoicon.png" className="img-responsive"/></div>
          </a>
        </div>
        <div className="movie-details">
          <div className="movie-title1"><a href="#">{this.props.componentData.name}</a></div>
          <div className="release">{this.props.componentData.release}</div>
          <div className="movie-lang">{this.props.componentData.lang}</div>
          <div className="movie-tags">{tags.map((com, i)=><span key={i} className="tags">{com}</span> )}</div>
        </div>
       <div className="videoPopup">
         <ReactPlayer url={this.props.componentData.video} playing={false} controls={true} width={800} height={600} />
        </div>
        <div className="videoPopBg" onClick={this.closeVideo.bind(this)}></div>
      </div>
    );
   }
  videos(_this){
    $('.videoPopup').eq(this.props.rowId).css('display','block');
     $('.videoPopBg').eq(this.props.rowId).css('display','block');
  }
  closeVideo(_this){
      $('.videoPopup').css('display','none');
      $('.videoPopBg').css('display','none');
      document.getElementsByTagName('iframe')[this.props.rowId].src=document.getElementsByTagName('iframe')[this.props.rowId].src;
    }
  }

  
export default Movies;
