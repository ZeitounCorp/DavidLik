// Utility to make http requests
import axios from 'axios';

const environnement = 'prod'; // 'development' || 'prod'

export const baseURL = environnement === 'development'
  ? 'http://localhost:8000'
  : 'https://davidliksrv.herokuapp.com/'

const BackEnd = axios.create({ baseURL })

export default BackEnd
