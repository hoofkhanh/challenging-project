import { useEffect, useState } from "react";
import axios from "axios";
import "./FavoriteUser.css";
import { Link } from "react-router-dom";
import heart from "../../assets/heart.png";
import redHeart from "../../assets/red-heart.png";

const FavoriteUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // const currentTime = Date.now();
        // const resetTime = 1720634010 * 1000; // Chuyển đổi sang miliseconds
        // const timeRemaining = Math.floor((resetTime - currentTime) / 1000); // Chuyển đổi sang giây
        // const hours = Math.floor(timeRemaining / 3600);
        // const minutes = Math.floor((timeRemaining % 3600) / 60);
        // const seconds = timeRemaining % 60;
        // console.log(`Thời gian còn lại: ${hours} giờ ${minutes} phút ${seconds} giây`);

        const fetchDate = async () => {
            await axios.get('http://localhost:4000/users/get-user-profiles', {
                params: {
                    phoneNumber: localStorage.getItem('phoneNumber')
                }
            })
            .then(async response => { 

                const userPromises = response.data.map( async user => {
                    try {
                        const response = await axios.get('http://localhost:4000/users/find-github-user-profiles?id=' + user.githubUserId);
                        const data =  response.data;
                        return {
                            ...data,
                            isFavorite: true
                        }
                    } catch (error) {
                        console.log(error);
                        return null;
                    }
                });

                const newUsers = await Promise.all(userPromises);
                setUsers(newUsers);
            })
            .catch(error => {
                console.log(error);
            });
        }

        fetchDate();
    },[]);

    const clickHeart = async (e, id) => {
        e.preventDefault();
        
        if(e.target.classList.contains('heart')) {
                axios.post('http://localhost:4000/users/like-github-users', {
                phoneNumber: localStorage.getItem('phoneNumber'), githubUserId: id
            })
            .then( async  response => {
                if(response.data == 'successfull') {
                    const response = await axios.get('http://localhost:4000/users/find-github-user-profiles?id=' + id);
                    const data =  response.data.map(user => ({
                        ...user,
                        isFavorite: true
                    }));

                    setUsers(preUser => [...preUser, data]);
                }
            })
            .catch(error => {
                console.log(error);
            });

            setUsers(prevUsers => {
                return prevUsers.map(user => {
                    if(user.id==id){
                        return {...user, isFavorite: true}
                    }

                    return user;
                });
            });

        }else {
            axios.delete('http://localhost:4000/users/delete-like-github-users', {
                params: {
                    phoneNumber: localStorage.getItem('phoneNumber'), githubUserId: id
                }
            })
            .then(response => {
                if(response.data == 'successfull') {
                    setUsers(prevUser => {
                        return prevUser.map(user => {
                            if(user.id == id) {
                                return {...user, isFavorite: false};
                            }

                            return user;
                        });
                    })
                }
            })
            .catch(error => {
                console.log(error);
            });

        }
    }

    return ( 
        <section>
            <h1>
                {localStorage.getItem('phoneNumber')}
            </h1>
            <Link to={'/github-users'}>
                <h1>
                    Trở về
                </h1>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>login</th>
                        <th>avatar_url</th>
                        <th>html_url</th>
                        <th>public_repos</th>
                        <th>followers</th>
                        <th>favorite</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.login}</td>
                            <td>
                                <div className='image-td'>
                                    <img src={user.avatar_url} alt="" />
                                </div>
                            </td>
                            <td>{user.html_url}</td>
                            <td>{user.public_repos}</td>
                            <td>{user.followers}</td>
                            <td>
                                {
                                    user.isFavorite == true ? (
                                        <img className="red-heart" 
                                            onClick={(e) => clickHeart(e, user.id)} 
                                            src={redHeart}  />
                                    ): (
                                        <img className="heart" 
                                            onClick={(e) => clickHeart(e, user.id)} 
                                            src={heart}  />
                                    )
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
     );
}
 
export default FavoriteUser;