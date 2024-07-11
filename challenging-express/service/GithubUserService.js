const axios = require('axios');
const {FavoriteGithubUser, PhoneNumber} = require('../config');

const gitHubSearchApi = 'https://api.github.com/search/users';
const gitHubApi = 'https://api.github.com/user';
const TOKEN = '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';

const searchGithubUsers = async (q, page, perPage) => {
    let users = [];
    await axios.get(gitHubSearchApi, {
        params :{page: page, per_page: perPage, q: `${q} in:login`},
        headers: {
            'Authorization': 'token '+ TOKEN,
        }
    })
    .then(response =>  {
        users = response.data.items;
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });

    return users;
}

const findGithubUserProfile = async (id) => {
    let user = {};
    
    await axios.get(gitHubApi + `/${id}`, {
        headers: {
            'Authorization': 'token '+ TOKEN,
        }
    })
    .then(response => {
        user = response.data;
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
    
    return {
        login: user.login,
        id: user.id,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        public_repos: user.public_repos,
        followers: user.followers
    }
}

const likeGithubUser = async(phoneNumber, githubUserId) => {
    const querySnapshot  = await PhoneNumber.where('phoneNumber', '==', phoneNumber).get();
    if(querySnapshot.empty){
        return false;
    }

    try {
        const user = await findGithubUserProfile(githubUserId);
        if(user.login == undefined) {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }

    await FavoriteGithubUser.add({phoneNumber: phoneNumber, githubUserId: githubUserId });
    return true;
}

const deleteLikeGithubUser = async(phoneNumber, githubUserId) => {
    
    const querySnapshotFavorite  = await FavoriteGithubUser.where('phoneNumber', '==', phoneNumber)
                                                            .where('githubUserId', '==', githubUserId)
                                                            .get();
    if(querySnapshotFavorite.empty){
        return false;
    }

    querySnapshotFavorite.forEach( async (doc) => {
        await FavoriteGithubUser.doc(doc.id).delete();
    });

    return true;
}    

const getUserProfile = async (phoneNumber) => {
    const querySnapshotFavorite  = await FavoriteGithubUser.where('phoneNumber', '==', phoneNumber).get();

    const favoriteGithubUsers = [];
    if(!querySnapshotFavorite.empty){
        querySnapshotFavorite.forEach(doc => {
            favoriteGithubUsers.push({id: doc.id, phoneNumber: doc.data().phoneNumber, githubUserId: doc.data().githubUserId});
        });
    }

    return favoriteGithubUsers;
}

module.exports = {
    searchGithubUsers,
    findGithubUserProfile,
    likeGithubUser,
    deleteLikeGithubUser,
    getUserProfile
}
