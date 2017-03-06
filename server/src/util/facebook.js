var credentials = require('../credentials.js')
var https = require('https')
var User = require('../models/user.js')

function makeRequest(opts, callback) {
	https.request(opts, function(res) {
		var data = '';
		res.on('data', function(chunk) {
			data += chunk;
		});
		res.on('error', function(e) {
			console.log(e);
		});
		res.on('end', function() {
			callback(data);
		});
	}).end();
}

exports.getAppAccessToken = function(cb) {
  var options = {
    host: 'graph.facebook.com',
    path: '/oauth/access_token?client_id=' + credentials.facebook.appId +'&client_secret=' + credentials.facebook.appSecret + '&grant_type=client_credentials'
  }
  makeRequest(options, function(data) {
    cb(data.substr(data.indexOf('=') + 1))
  })
}
/*
 * Verifies Client Side Token
 * callback: @boolean stating whether the token is valid, @UserObject representing the user associated
 */
exports.verifyClientToken = function(clientToken, cb) {
	var options = {
    host: 'graph.facebook.com',
    path: '/debug_token?input_token=' + clientToken + "&access_token=" + credentials.facebook.appId + "|" + credentials.facebook.appSecret
  }
	makeRequest(options, function(data) {
		var objData = JSON.parse(data)
		if(objData.data.is_valid) {
			process.nextTick(function() {
				User.findOne({'facebookId': objData.data.user_id}, function(err, found) {
					if(err) console.log(err)
					else cb(true, found)
				})
			})
		}
		else {
			cb(false, null)
		}
	})

	exports.createAccount = function(clientToken, cb) {
		console.log("creating new user...")
		var options = {
			host: 'graph.facebook.com',
			path: '/me?fields=first_name,last_name,gender&access_token=' + clientToken
		}
		makeRequest(options, function(data) {
			var objData = JSON.parse(data)
			var newUser = new User({
				facebookId: objData.id,
				profile: {
					name: {
						first: objData.first_name,
						last: objData.last_name
					},
					gender: objData.gender
				}
			})
			newUser.save(function(err) {
				if(err) console.log(err)
				else cb(newUser)
			})
		})
	}
}
