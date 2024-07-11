import { useEffect, useState } from "react";
import record_symbol_image from "../../assets/record-symbol.png";
import heart from "../../assets/heart.png";
import redHeart from "../../assets/red-heart.png";

import styles from "./GithubUser.module.css";
import Pagination from "./Pagination";
import axios from "axios";
import { Link } from "react-router-dom";

const GithubUser = () => {

    const [perPage, setPerPage] = useState(0);

    const [users, setUsers] = useState([]);

    const [favoriteUserId, setFavoriteUserId] = useState([]);

    const inputPerPage = (e) => {
        setPerPage(e.target.value);
    }

    const clickSearchButton = async ( page) => {
        if(perPage > 100){
            alert('Nếu bạn nhập lớn hơn 100 thì api github chỉ trả về đúng 100 users');
        }
        
        const loginName = document.getElementById('login-name').value;

        await axios.get('http://localhost:4000/users/search-github-users', {
            params: {
                q: loginName, page: page, per_page: perPage
            }
        })
        .then(response => {
            setUsers(response.data.map(user => {
                const isFav = favoriteUserId.includes(user.id);
                return {
                    ...user,
                    isFavorite: isFav
                };
            }));
        })
        .catch(error => {
            console.log(error);
        });

        setPerPage(document.getElementById('input-perpage').value);
        console.log(favoriteUserId)
    }

    useEffect(  () => {
        const fetchDate = async () => {
            await axios.get('http://localhost:4000/users/get-user-profiles', {
                params: {
                    phoneNumber: localStorage.getItem('phoneNumber')
                }
            })
            .then(response => {
                setFavoriteUserId(response.data.map(item => item.githubUserId));
            })
            .catch(error => {
                console.log(error);
            });
        }

        fetchDate();
    }, []);

    const clickHeart = async (e, id) => {
        e.preventDefault();
        
        if(e.target.classList.contains('heart')) {
                axios.post('http://localhost:4000/users/like-github-users', {
                phoneNumber: localStorage.getItem('phoneNumber'), githubUserId: id
            })
            .then(  response => {
                if(response.data == 'successfull') {
                    setFavoriteUserId(prevFavoriteUserId => [...prevFavoriteUserId, id ]);
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
                    const updateFavoriteUser = favoriteUserId.filter(idUser => idUser != id);
                    setFavoriteUserId(updateFavoriteUser);
                }
            })
            .catch(error => {
                console.log(error);
            });

            setUsers(prevUsers => {
                return prevUsers.map(user => {
                    if(user.id==id){
                        return {...user, isFavorite: false}
                    }
                    
                    return user;
                });
            });

        }
    }

    return ( 
        <section>
            <header>
                <div className={styles['input-image-div']}>
                    <div>
                        <input id="login-name" type="text" placeholder="Enter login name ..." />
                        <input value={perPage} id="input-perpage" style={{marginLeft: '10px'}} onChange={inputPerPage}
                            placeholder="enter the number of user that u want to show" />
                    </div>
                    <div className={styles['image-div']}>
                        <Link to={'/favorite-github-users'}>
                            <img src={record_symbol_image} />
                        </Link>
                    </div>
                </div>
            </header>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Pagination perPage={perPage}  clickSearchButton={clickSearchButton} />
            </div>
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>login</th>
                            <th>avatar_url</th>
                            <th>html_url</th>
                            <th>public_repos</th>
                            <th>followers</th>
                            <th>Favorite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.login}</td>
                                <td>
                                    <div className={styles['image-td']}>
                                        <img src={user.avatar_url} alt="" />
                                    </div>
                                </td>
                                <td>{user.html_url}</td>
                                <td>{user.repos_url}</td>
                                <td>{user.followers_url}</td>
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
                
            </main>
        </section>
     );
}
 
export default GithubUser;