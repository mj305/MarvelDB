"use strict";

var userName = "JS";
var users = {
  userName: userName,
  email: "js@gmail.com",
  firstName: "John",
  lastName: "Snow",
  profile: {
    bio: "Night Comander",
    picture: {
      url: "http://randomurl",
      extension: "png",
      date: {
        createdOn: "03/23/80",
        updatedOn: "01/15/95"
      }
    }
  }
};
users.userName = "Frrodo";
users.profile.bio = "Dead Resurected";
var url = users.profile.picture.url;
var _users$profile$pictur = users.profile.picture.date,
    createdOn = _users$profile$pictur.createdOn,
    updatedOn = _users$profile$pictur.updatedOn;
console.log(createdOn);
console.log(updatedOn);