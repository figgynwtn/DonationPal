import {useState, useEffect} from 'react';  
import axios from "axios";
import { useParams } from 'react-router-dom';

function useUserFetcher() {
    // const { _id } = useParams();
    const [user, setUser] = useState([]);
    const userSource = "http://localhost:8080/api/v1/users/63d29f6cb06aae132e00ee3c"

    useEffect( () => {
            axios.get(userSource)
                .then(res => {
                    console.log(res);
                    console.log(userSource);
                    setUser(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
    }, []);

    return [user];
}


export default useUserFetcher;