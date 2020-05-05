
let _baseURL = 'http://www.onlinescheduler.tk/';
if(window.location.href.startsWith('https://www.onlinescheduler.tk/"'))
    _baseURL = "https://www.onlinescheduler.tk/";
else if(window.location.href.startsWith("https://onlinescheduler.tk/"))
    _baseURL = "https://onlinescheduler.tk/";
else 
    _baseURL = "http://localhost:5000/";

const BaseURL = () => {
    return _baseURL;
}

export default BaseURL;