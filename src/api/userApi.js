import axios from 'axios';

const url = "http://localhost:5000"
export const register = async (formValue) => {

  if (Object.values(formValue).some(x => x === null || x === '')) {
    return "Some information is missing";
  }

  try {
    // make axios post request
    const res = await axios({
      method: "post",
      url: `${url}/api/v1/register`,
      data: formValue,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      ...error.response.data
    }
  }

}


export const login = async (formValue) => {

  if (Object.values(formValue).some(x => x === null || x === '')) {
    return "Some information is missing";
  }

  try {
    // make axios post request
    const res = await axios({
      method: "post",
      url: `${url}/api/v1/login`,
      data: formValue,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      ...error.response.data
    }

  }


}

export const userInfo = async (token) => {

  if (token === undefined) {
    return "Some information is missing";
  }
  try {
    // make axios post request
    const res = await axios({
      method: "get",
      url: `${url}/api/v1/user`,
      headers: { authorization: token },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      ...error.response.data
    }
  }
}





export const getAvailableAttendanceList = async (token) => {

  if (token === undefined) {
    return "Some information is missing";
  }
  try {
    // make axios post request
    const res = await axios({
      method: "get",
      url: `${url}/api/v1/user/attendance/list`,
      headers: { authorization: token },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      ...error.response.data
    }
  }


}

export const postEventAttendances = async (file, EID, token) => {

  if (token === undefined) {
    return "Some information is missing";
  }
  try {
    const formData = new FormData();

    // Update the formData object 
    formData.append(
      "studentlist",
      file
    );
    formData.append(
      "EID",
      EID
    );

    // make axios post request
    const res = await axios({
      method: "post",
      url: `${url}/api/v1/user/attendance`,
      data: formData,
      headers: { authorization: token },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      ...error.response.data
    }
  }


}

export const addEvent = async (event, token) => {

  if (token === undefined) {
    return "Some information is missing";
  }
  try {
    // make axios post request
    const res = await axios({
      method: "post",
      url: `${url}/api/v1/user/event`,
      data: event,
      headers: { authorization: token },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      ...error.response.data
    }
  }


}

export const getUserEvents = async (token) => {

  if (token === undefined) {
    return "Some information is missing";
  }
  try {
    // make axios post request
    const res = await axios({
      method: "get",
      url: `${url}/api/v1/user/event`,
      headers: { authorization: token },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      ...error.response.data
    }
  }


}

export const updateUserInfo = async (token, fullName, birthday, phone) => {
  // if (Object.values(formData).some(x => x === null || x === '')) {
  //   return "Some information is missing";
  // }

  try {
    // make axios patch request
    const res = await axios({
      method: "patch",
      url: `${url}/api/v1/user`,
      data: { fullName, birthday, phone },
      headers: { authorization: token },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      ...error.response.data
    }
  }


}





export const getEventDetails = async (eid, token) => {
  if (token === undefined) {
    return "Some information is missing";
  }
  try {
    // make axios post request
    const res = await axios({
      method: "get",
      url: `${url}/api/v1/event/${eid}`,
      headers: { authorization: token },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      ...error.response.data
    }
  }
}

export const checkin = async (sid, eid, token) => {
  if (token === undefined) {
    return "Some information is missing";
  }
  try {
    // make axios post request
    const res = await axios({
      method: "post",
      url: `${url}/api/v1/user/attendance/check_in`,
      data: { SID: sid, EID: eid },
      headers: { authorization: token },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      ...error.response.data
    }
  }
}

export const checkout = async (sid, eid, token) => {
  if (token === undefined) {
    return "Some information is missing";
  }
  try {
    // make axios post request
    const res = await axios({
      method: "post",
      url: `${url}/api/v1/user/attendance/check_out`,
      data: { SID: sid, EID: eid },
      headers: { authorization: token },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      ...error.response.data
    }
  }
}



export const changePassword = async (token, password) => { }


export const getAttendanceResult = async (eid, token) => {
  if (token === undefined) {
    return "Some information is missing";
  }
  try {
    // make axios post request
    const res = await axios({
      method: "get",
      url: `${url}/api/v1/user/attendance/?EID=${eid}`,
      headers: { authorization: token },
    });
    return res.data;
  } catch (error) {
    return {
      status: error.response.status,
      ...error.response.data
    }
  }
}