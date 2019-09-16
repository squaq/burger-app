import axios from 'axios';


const instace  = axios.create({
    baseURL: 'https://react-my-burger-sq.firebaseio.com/'
})

export default instace;