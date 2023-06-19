import React from 'react'
import {useEffect} from 'react'
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useState} from 'react';

interface IRequests {
    username: string,
}

function FriendRequests() {

    const [friendRequests, setFriendRequests] = useState<IRequests[] | []>([])
    useEffect(() => {
        // Get friend requests
        try {
            const token = localStorage.getItem('x-auth-token');
            if(!token) {
                console.log("No token");
                return;
            } else {
                console.log("Received token: " + token);
                axios.get('http://localhost:5000/users/friends/requests', {headers: {"x-auth-token": token}})
                .then(res => {
                    let requests: IRequests[];
                    if(typeof res.data ==='string' && res.data.trim() !== '') {
                        requests = [{username: res.data}];
                    } else if (Array.isArray(res.data) && res.data.length > 0) {
                        requests = res.data.map((username: string) => ({username: username}));
                    } else {
                        requests = [];
                    }               
                        console.log(requests);
                        setFriendRequests(requests);
                })
                .catch(err => {

                })
            }
            
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <div className = "FriendRequests">
            <h2> Friend Requests </h2>
            <ul>
            {
                friendRequests.map((request: IRequests, index: number) => {
                    return <li key = {index}>{request.username}</li>
                })
            }
            </ul>
        </div>
    )
} 

  
export default FriendRequests