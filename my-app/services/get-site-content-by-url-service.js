import axios from "axios";

const get_site_content_by_url = async (url) =>{
    axios.get(url)
      .then(response => console.log(response.data))
      .catch(error => console.error('Error:', error));

}

export {get_site_content_by_url}
