import { apiConnector } from "../apiConnector"
import {settingsEndpoints} from '../api'
import { removeData, setData } from "../../features/auth/authSlice";
import { setProfileInfo, setSuccess } from "../../features/profile/profileSlice";


const {UPDATE_PROFILE_API,UPDATE_PROFILE_PICTURE_API,DELETE_PROFILE_API}=settingsEndpoints


export function updateProfilePicture(formData) {
  return async(dispatch) => {
    try {

      console.log("profilePicture Form Data=>", Object.fromEntries(formData))
      const response = await apiConnector('POST', UPDATE_PROFILE_PICTURE_API, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      console.log("Profile Operation response => ", response.data);
      
      if (response.data.success) {
        dispatch(setData(response.data.data))
      }

      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }
      
      // return response.data;
    } catch (error) {
      console.log("Error occurred while Updating Profile => ", error);
    }
  }
}

export function updateProfile(data,token,navigate){
  return async(dispatch)=>{
    try {

      const{ gender, DOB, description, contactNum, firstName, lastName,}=data

      console.log("Data => ",data)
      const response =await apiConnector("POST",UPDATE_PROFILE_API,{ gender, DOB, description, contactNum, firstName, lastName,token});

      console.log("Prodile Update response =====> ",response)

      if (response.data.success) {

        console.log("Updated Data => ",response.data.data2)

        dispatch(setData(response.data.data1))
        dispatch(setProfileInfo(response.data.data2))

        navigate('/dashboard/my-profile')

      }

      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }

      return response.data;

    } catch (error) {
      console.log("Error occured While Updating Profile details => ",error)
    }
  }
}


export function deleteAccount(token,navigate){
  return async(dispatch)=>{
    try {
      console.log("Token Frontend => ",token)
      const response =await apiConnector('DELETE',DELETE_PROFILE_API,{token});
      console.log("Delete Profile response => ",response);
      navigate('/')
      dispatch(removeData())

      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }


    } catch (error) {
      console.log("Error Occured While Deleteing Account => ",error)
    }
  }
}

