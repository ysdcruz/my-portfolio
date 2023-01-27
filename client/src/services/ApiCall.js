import axios from "axios"

export const commonrequest = async ( methods, url, body ) => {

  var config = {
    method: methods,
    url: url,
    data: body
  }

  // axios instance
  return axios(config).then((data) => {
    return data;
  }).catch((err) => {
    return err;
  });

}