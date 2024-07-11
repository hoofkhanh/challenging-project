const githubUserService = require('../service/GithubUserService');

// tham số là q (tìm user nào login nào có chứa q này), page số trang, perPage số lượng user mỗi trang trong param
const searchGithubUsers = async (req, res) => {
    try {
        const { q, page, per_page } = req.query;

        const users =  await githubUserService.searchGithubUsers(q, page, per_page);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send({ error: "Failed" });
    }
};

// tham số id trong parameter
const findGithubUserProfile = async (req, res) => {
    try {
        const id =req.query.id;
        const user =  await githubUserService.findGithubUserProfile(id);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send({ error: "Failed" });
    }
};

// tham số phoneNumbe và githubUserId trong body
const likeGithubUser = async(req, res) => {
    try {
        const data =req.body;
        console.log(data.githubUserId, data.phoneNumber)
        const success =  await githubUserService.likeGithubUser(data.phoneNumber, data.githubUserId);
        if(success){
            res.status(200).send('successfull');
        }else {
            res.status(400).send('not found with phoneNumber or githubUserId');
        }
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send({ error: "Failed to like github user" });
    }
}

// tham số phoneNumbe và githubUserId trong param
const deleteLikeGithubUser = async(req, res) => {
    try {
        const {phoneNumber, githubUserId} =req.query;
        console.log(typeof parseInt(githubUserId) === 'number')
        const success =  await githubUserService.deleteLikeGithubUser(phoneNumber, parseInt(githubUserId));

        if(success){
            res.status(200).send('successfull');
        }else {
            res.status(400).send('not found with phoneNumber or githubUserId');
        }
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send({ error: "Failed" });
    }
}

// tham số phoneNumber parameter
const getUserProfile = async(req, res) => {
    try {
        const phoneNumber =req.query.phoneNumber;
        const favoriteGithubUsers =  await githubUserService.getUserProfile(phoneNumber);

        res.status(200).json(favoriteGithubUsers);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send({ error: "Failed" });
    }
}

module.exports= {
    searchGithubUsers,
    findGithubUserProfile,
    likeGithubUser,
    deleteLikeGithubUser,
    getUserProfile
}