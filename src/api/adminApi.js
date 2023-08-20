import axios from 'axios';
const url = "http://localhost:5000"

export const getPendingEvents = async (token)=>{
    try {
        // make axios post request
        const res = await axios({
          method: "get",
          url: `${url}/api/v1/admin/event/pending`,
          headers: { authorization: token },
        });
        return res.data;
      } catch(error) {
        return {
          status: error.response.status,
          ...error.response.data
        }
      }
}

export const getCheckedEvents = async (token)=>{
    try {
        // make axios post request
        const res = await axios({
          method: "get",
          url: `${url}/api/v1/admin/event/checked`,
          headers: { authorization: token },
        });
        return res.data;
      } catch(error) {
        return {
          status: error.response.status,
          ...error.response.data
        }
      }
}

export const getPendingUsers = async (token)=>{
    try {
        // make axios post request
        const res = await axios({
          method: "get",
          url: `${url}/api/v1/admin/user/pending`,
          headers: { authorization: token },
        });
        return res.data;
      } catch(error) {
        return {
          status: error.response.status,
          ...error.response.data
        }
      }
}
export const getCheckedUsers = async (token)=>{
    try {
        // make axios post request
        const res = await axios({
          method: "get",
          url: `${url}/api/v1/admin/user/checked`,
          headers: { authorization: token },
        });
        return res.data;
      } catch(error) {
        return {
          status: error.response.status,
          ...error.response.data
        }
      }
}

export const updateEventStatus = async (token, id, status)=>{
    try {
        // make axios post request
        const res = await axios({
          method: "patch",
          url: `${url}/api/v1/admin/event/update-status/${id}`,
          data: {status},
          headers: { authorization: token },
        });
        return res.data;
      } catch(error) {
        return {
          status: error.response.status,
          ...error.response.data
        }
      }
}

export const updateUserStatus = async (token, email, status)=>{
    try {
        // make axios post request
        const res = await axios({
          method: "patch",
          url: `${url}/api/v1/admin/user/update-status/${email}`,
          data: {status},
          headers: { authorization: token },
        });
        return res.data;
      } catch(error) {
        return {
          status: error.response.status,
          ...error.response.data
        }
      }
}

// Role: 0 - user and 1 - Admin
export const updateUserRole = async (token, email, role)=>{
    try {
        // make axios post request
        const res = await axios({
          method: "patch",
          url: `${url}/api/v1/admin/user/update-role/${email}`,
          data: {role},
          headers: { authorization: token },
        });
        return res.data;
      } catch(error) {
        return {
          status: error.response.status,
          ...error.response.data
        }
      }
}


// formData contains name (filename) and availableList (file data)
export const addAvailableFile = async (token, formData)=>{
    try {
        // make axios post request
        const res = await axios({
          method: "post",
          url: `${url}/api/v1/admin/file`,
          data: formData,
          headers: { authorization: token },
        });
        return res.data;
      } catch(error) {
        return {
          status: error.response.status,
          ...error.response.data
        }
      }
}

export const getAvailableFiles = async (token)=>{
  try {
      // make axios post request
      const res = await axios({
        method: "get",
        url: `${url}/api/v1/admin/file`,
        headers: { authorization: token },
      });
      return res.data;
    } catch(error) {
      return {
        status: error.response.status,
        ...error.response.data
      }
    }
}

export const updateAvailableFile = async (token, formData)=>{
  try {
      // make axios post request
      const res = await axios({
        method: "patch",
        url: `${url}/api/v1/admin/file`,
        data: formData,
        headers: { authorization: token },
      });
      return res.data;
    } catch(error) {
      return {
        status: error.response.status,
        ...error.response.data
      }
    }
}

export const deleteAvailableFile = async (token, fileName)=>{
  try {
      // make axios post request
      const res = await axios({
        method: "delete",
        url: `${url}/api/v1/admin/file`,
        data: {fileName},
        headers: { authorization: token },
      });
      return res.data;
    } catch(error) {
      return {
        status: error.response.status,
        ...error.response.data
      }
    }
}