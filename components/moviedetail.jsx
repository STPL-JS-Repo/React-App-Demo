import React, { Component, PropTypes } from 'react';
import TopNavigation from '../components/topnavigation.jsx';
import Login from '../components/login.jsx';
import Footer from '../components/footer.jsx';
import ReactPlayer from 'react-player'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


class MoviesDetails extends Component {
    constructor(props) {
        super(props);
        console.log("Movies Details");
          this.state = {data:[], reviews:[]}
          console.log(this.state)
    }

    render() {
        return (
          <div>
           <TopNavigation />
           <MovieDetailsHead appdata={this.state.data} />
           <MovieContainer contdata={this.state.data} reviewsData = {this.state.reviews}/>
           <Footer /> 
      		 <Login />
           <VideoPoup videodata={this.state.data}/>
          </div> 
        );
    }

  componentWillMount(){
    var movieName = this.props.location.query.movie;
    console.log(movieName);
    let ref = firebase.database().ref('movies/');
    ref.orderByChild("name").equalTo(movieName).on("child_added", function(data) {
        let  moviedata =  data.val();
        console.log(moviedata)
          this.setState({ data:moviedata });
           }.bind(this));
     let myref = firebase.database().ref('reviewsUser/');
      // let movieName = this.props.contdata.name;
       myref.orderByChild("movie").equalTo(movieName).on("child_added", function(data) {
          let  reviewdata =  data.val();
          console.log(reviewdata)
          this.setState({ reviews:reviewdata });
        }.bind(this));
       }  
       
}

class MovieDetailsHead extends Component{
  render(){
    const imgPath = "images/movie/";
    const tagsProps = this.props.appdata.tags;
    const tags = tagsProps.split(',');
    const bannerImg = this.props.appdata.images[1];
    const bannerStyle={
     width: "100%",
     height: "400px",
     backgroundImage: "url(" + bannerImg + ")",
     backgroundSize:' cover',
     backgroundRepeat:'no-repeat',
     backgroundPosition:'0% 32%',
      };
     const overlayStyle={
     width: "100%",
     height: "400px",
     background: 'linear-gradient(to right, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.60) 40%,rgba(0, 0, 0, 0.20) 60%,  rgba(0, 0, 0, 0) 100%)'
      };
      const moviePoster={
        position:"absolute",
        top:"37%",
        zIndex:"999",
        width:"18%",
        height:"270px",
        backgroundImage:"url("+imgPath+this.props.appdata.poster+")",
        left: "7%",
        border: "4px solid #fff",
        backgroundPosition: "30%"
      }
    
      return(
          <div className="row">
            
            <div className="col-md-12 banner" style={bannerStyle}>
             <div className="videoButton" style={overlayStyle}></div>
             <div className="videoIcon"><a className="btn btn-primary" onClick={this.showVideo.bind()}><img src="images/videoicon.png" className="img-responsive" /></a></div>
             <div className="appItems">
               <div className="col-md-12 itemName">{this.props.appdata.name}</div>
               <div className="col-md-12 language">{this.props.appdata.lang}</div>
               <div className="col-md-12 itemTags">{tags.map((com, i)=><span key={i} className="tags">{com}</span> )}</div>
             </div>
            </div>
             <div style={moviePoster}></div>
          </div>
        )
  }
  showVideo(){
      $('.videoPopup').css('display','block');
      $('.videoPopBg').css('display','block');

  }
}

class VideoPoup extends Component {
  render(){
    return(
        <div>
        <div className="videoPopup">
         <ReactPlayer url={this.props.videodata.video} playing={false} controls={true} width={800} height={600} />
        </div>
        <div className="videoPopBg" onClick={this.closeVideo.bind()}></div>
        </div>
      )

    
  }
closeVideo(){
      $('.videoPopup').css('display','none');
      $('.videoPopBg').css('display','none');
      document.getElementsByTagName('iframe')[0].src=document.getElementsByTagName('iframe')[0].src;
      console.log("close");
    }

}

class MovieContainer extends Component {
  render(){
    var rating = -(this.props.contdata.rating*2*16)+"px";
    var ratingStyle= {
      backgroundPositionY: rating
    }
    return (
             <div className="pageCont">
            <div className="row">
              <div className="col-md-12">
                
                <div className="col-md-8 mainCont">
                 <div className="col-md-12">
                 <div className="movie-rating1"><div className="ratingdata">{this.props.contdata.rating}</div><div className="rating" style={ratingStyle}></div></div>
                 </div>
                  <div className="col-md-12">
                      <Tabs>
                        <TabList>
                          <Tab>Discription</Tab>
                          <Tab>Storyline</Tab>
                          <Tab>Star Cast</Tab>
                          <Tab onClick={this.userReviews.bind(this)}>User Reviews</Tab>
                        </TabList>
                     
                        <TabPanel>
                          <p>{this.props.contdata.discription}</p>
                        </TabPanel>
                        <TabPanel>
                           <p>{this.props.contdata.storyline}</p>
                        </TabPanel> 
                        <TabPanel>
                        <div className="col-md-3">
                          <p>Director</p>
                          <p>Stars Cast</p>
                          <p>Writers</p>
                        </div>
                        <div className="col-md-9">
                           <p>{this.props.contdata.cast.director}</p>
                           <p>{this.props.contdata.cast.stars}</p>
                           <p>{this.props.contdata.cast.writers}</p>
                        </div>
                        </TabPanel>
                        <TabPanel>
                           <h1 className="reviewTitle">Please Submit Your Reviews</h1>
                          <form name="reviews">
                            <span>User Name</span> : <input type="text" name="userName" className="reviewText" /><br/>
                            <span>Title</span> : <input type="text" name="title" className="reviewText"/><br/>
                            <span>Comment</span> : <textarea name="comment" rows="3" cols="25" className="reviewText"></textarea><br/>
                            <input type="button" value="Submit" className="reviewbtn" onClick={this.reviews.bind(this)}/><br/>
                          </form>
                        </TabPanel>
                      </Tabs>
                  </div>
                  <div className="col-md-12 bottomimages">
                  {this.props.contdata.images.map((dnycont, count) =><div key={count} className="col-md-3"><img src={dnycont} className="img-responsive" onClick={this.imgGal.bind(this)} /></div>)}

                    
                  </div>
                </div>
                <div className="col-md-4 rightSidebar">
                   <img src="./images/bookmymovie.png" />
                </div>
              </div>

            </div>
              
            </div>
      )
  }
  userReviews(_this){
       let ref = firebase.database().ref('reviewsUser/');
       let movieName = this.props.contdata.name;
       ref.orderByChild("movie").equalTo(movieName).on("child_added", function(data) {
          let  reviewdata =  data.val();
          console.log(reviewdata)
          this.setState({ reviews:reviewdata });
          console.log(this.state);
        }.bind(this))
  }

  reviews(_this){
    let ref = firebase.database().ref('reviewsUser/');
    let newUserKey = firebase.database().ref().child('reviewsUser').push().key;
    let formData = document.reviews;
    const userData = {
      movie:this.props.contdata.name,
      user: formData.userName.value,
      title: formData.title.value,
      comment: formData.comment.value
    };
    var updates={}
    console.log(userData)
    updates['reviewsUser/' + newUserKey] = userData;
    return firebase.database().ref().update(updates);  
  }

  imgGal(_this){
   var imgSrc = this.props.contdata.images;
    $('.imgPopup').css('display','block');
    $('.imgPopBg').css('display','block');
    
   return <ImgGalPoup imgContent = {imgSrc}/>
  }
}

class ImgGalPoup extends Component {
  render(){
    return(
         <div>
          <div className="imgPopup">
            <img src={this.props.imgContent} />
          </div>
          <div className="imgPopBg" onClick={this.closeImgGall.bind()}></div>
        </div>
      )

    
  }
  closeImgGall(){
    alert(this.props.imgContent)
      $('.imgPopup').css('display','none');
      $('.imgPopBg').css('display','none');
    }

}
export default MoviesDetails;
