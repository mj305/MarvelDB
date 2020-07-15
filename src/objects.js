const userName = "JS"

const users = {
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
        updatedOn: "01/15/95",
      }
    }
  }
};

users.userName = "Frrodo"
users.profile.bio = "Dead Resurected"
const { url } = users.profile.picture
const { createdOn, updatedOn } = users.profile.picture.date



console.log(createdOn)
console.log(updatedOn)