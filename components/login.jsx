import React from 'react';

class Login extends React.Component {

	render() {
		return (

        <div className="modal fade" id="modal1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>
            <div className="modal-body">
			<div className="form">

      <ul className="tab-group">
        <li className="tab active signup"><a href="#signup">Sign Up</a></li>
        <li className="tab login"><a href="#login">Log In</a></li>
      </ul>
      
      <div className="tab-content">
        <div id="signup">   
          <h1>Sign Up for Free <span id="loginerr">This email id is already registered</span></h1>
          
          <form action="/" method="post" name="signupform">
          
          <div className="top-row">
            <div className="field-wrap">
              <label>
                First Name
              </label>
              <input type="text" required name="fname"/>
            </div>
        
            <div className="field-wrap">
              <label>
                Last Name
              </label>
              <input type="text" required name="lname"/>
            </div>
          </div>

          <div className="field-wrap">
            <label>
              Email Address
            </label>
            <input type="email" required name="email"  />
          </div>
          
          <div className="field-wrap">
            <label>
              Set A Password
            </label>
            <input type="password" required name="pass" />
          </div>
          
          <button type="button" className="button button-block" onClick = {this.signup.bind(this)}>Get Started</button>
          
          </form>

        </div>
        
        <div id="login">   
          <h1>Welcome Back!<span id="loginerr">Please use correct user name or password</span></h1>

          <form action="/" method="post" name="loginform">
            <div className="field-wrap">
            <label>
              Email Address
            </label>
            <input type="email" required name="email" />
          </div>
          <div className="field-wrap">
            <label>
              Password
            </label>
            <input type="password" required name="pass" />
          </div>
          <button type="button" className="button button-block" onClick = {this.login.bind(this)}>Log In</button>

          </form>
        </div>    
      </div>
      
</div> 
</div>
          </div>
        </div>
      </div>
		);
	}
  signup(event){
    var formData = document.signupform;
    var fname = formData.fname.value;
    var lname = formData.lname.value;
    var email = formData.email.value;
    var pass = formData.pass.value;
    var timeStamp = Date.now();
    var outhcode = 'BM'+timeStamp+'_fb';
    this.writeUserData(fname, lname, email, pass, outhcode);
    formData.fname.value = '';
    formData.lname.value = '';
    formData.email.value = '';
    formData.pass.value = '';
    event.preventDefault();
  }
   writeUserData(fname, lname, email, pass, outhcode) {
         var userData = {
            email : email,
            pass: pass,
            outhcode: outhcode,
            username: fname+' '+lname
          };
          var checkSignUp ='';
          var ref = firebase.database().ref('userlogin/');  
        var newUserKey = firebase.database().ref().child('userlogin').push().key;
        var updates = {};
          updates['userlogin/' + newUserKey] = userData;
          $('#signup #loginerr').fadeOut('hide');
          // $('#modal1').modal('hide');
          $('.signup').removeClass('active');
          $('#signup').hide();
          $('.login').addClass('active');
          $('#login').show();
          $('#modal1').modal(); 
          return firebase.database().ref().update(updates);  
          
        }

	login(event) {
    var formData = document.loginform;
    var email = formData.email.value;
    var pass = formData.pass.value;

    var userdata = {};
    var ref = firebase.database().ref('userlogin/'); 
      ref.orderByChild("email").equalTo(email).on("child_added", function(data) {
        userdata =  data.val();
        console.log(userdata)
        if(userdata.email == email && userdata.pass == pass){
        $('#login #loginerr').fadeOut('hide');
        sessionStorage.setItem('useroth', userdata.outhcode);
        sessionStorage.setItem('username', userdata.username);
        $('#userac').text(' Logout');
        $('#userlog a span:first-child').removeClass('glyphicon-log-in');
        $('#userlog a span:first-child').addClass('glyphicon-log-out');
        $('#userprofile').text(' '+sessionStorage.getItem('username'));
        $('#signin').hide();
        $('#username').show();
       $('#modal1').modal('hide');
    }else{
     $('#login #loginerr').fadeIn('slow');
    }
          });
    
    event.preventDefault();
	}



}

export default Login;
