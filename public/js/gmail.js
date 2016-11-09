function onSuccess(googleUser) {
     		var profile = googleUser.getBasicProfile();
            var profileHTML = '<div class="profile"><div class="head">Welcome '+profile.getGivenName()+'! <a href="javascript:void(0);" onclick="signOut();">Sign out</a></div>';
            profileHTML += '<img src="'+profile.getImageUrl()+'"/><div class="proDetails"><p>'+profile.getName()+'</p><p>'+
            profile.getEmail()+'</p></div></div>';
            console.log("hola mundo !!!" + profile.getGivenName());
            $('.userContent').html(profileHTML);
		}
		function onFailure(error) {
		    alert(error);
		}
		function renderButton() {
		    gapi.signin2.render('gm', {
		        'scope': 'profile email',
		        'width': 240,
		        'height': 50,
		        'longtitle': true,
		        'theme': 'dark',
		        'onsuccess': onSuccess,
		        'onfailure': onFailure
		    });
		}
		function signOut() {
		    var auth2 = gapi.auth2.getAuthInstance();
		    auth2.signOut().then(function () {		        
		       window.location = "index.html";
		    });
		}

		
