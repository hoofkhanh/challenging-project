const express= require('express');
const cors= require('cors');
const app=express();
app.use(express.json());
app.use(cors());

const phoneNumberController =  require('./controller/PhoneNumberController');
const githubUserController =  require('./controller/GithubUserController');

app.post('/create-new-access-code', phoneNumberController.createNewAccessCode);

app.post('/validate-access-code', phoneNumberController.validateAccessCode);

app.get('/users/search-github-users', githubUserController.searchGithubUsers);

app.get('/users/find-github-user-profiles', githubUserController.findGithubUserProfile);

app.post('/users/like-github-users', githubUserController.likeGithubUser);

app.delete('/users/delete-like-github-users', githubUserController.deleteLikeGithubUser);

app.get('/users/get-user-profiles', githubUserController.getUserProfile);
    
app.listen(4000, ()=> console.log( 'Up'));