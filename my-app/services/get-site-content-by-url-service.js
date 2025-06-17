import axios from "axios";
import { response } from "express";

const get_site_content_by_url = async (url) =>{
  try{
    const response = await axios.get(url)
    // .then(response => console.log(response.data))
    // .catch(error => console.error('Error:', error));

    console.log("Fetch data successfully ", response.data);
    return {
      status: "success",
      data: {
        message: "Site content fetched successfully",
        content: response.data
      },
      statusCode: 200
    }
  } catch(error){
    return {
      status: "error",
      data: {
        message: "Failed to fetch site content",
        error: error.message
      },
      statusCode: 500
    }
  }

    

}

export {get_site_content_by_url}
