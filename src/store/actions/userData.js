import axios from 'axios';
import * as actionTypes  from './actionTypes';

export const createUserSuccess = (userData,status)=>{
  return{
      type: actionTypes.USER_DATA_SUCESS,
      userData: userData,
      successStatus:status
  };
};

export const updateUserSucess = (name, updatedAt)=>{
  return{
       type :actionTypes.UPDATE_USER_SUCESS,
       updatedAt: updatedAt,
       name: name

  }
}

export const createUserStart =() =>{
   return{
    type: actionTypes.USER_DATA_START
   };
};
export const createUserFail = (error) =>{
    return {
        type: actionTypes.USER_DATA_FAIL,
        error: error
    }
}

export const createUser= (formData)=>{
    return dispatch =>{
        dispatch(createUserStart());       
        axios.post('https://reqres.in/api/users', formData)
           .then(response =>{
               console.log(response.status);
               dispatch( createUserSuccess(response.data, response.status));
                                      
           })
           .catch(error =>{
               dispatch(createUserFail(error));
           });
           
    
    };
};
export const updateUserStart = () =>{
    return {
          type: actionTypes.UPDATE_USER_START
    }
}
export const updateUserSuccess = (updateAt) =>{
    return{
         type: actionTypes.UPDATE_USER_SUCESS,
         updatedAt: updateAt
    };
};
export const updateUserFail = (error) =>{
    return{
         type: actionTypes.UPDATE_USER_FAIL,
         error:error
    };
};

export const updateUser= (name,job,userId)=>{
    return dispatch =>{
        dispatch(updateUserStart());
        const userData ={
            name: name,
            job:job
        }
       
        axios.put('https://reqres.in/api/users/'+userId, userData)
           .then(response =>{
               console.log(response);
               dispatch( updateUserSuccess(response.data.id,
                                            response.data.updateAt,
                                            response.data.name));
                                      
           })
           .catch(error =>{
               dispatch(updateUserFail(error));
           });
           
    
    };
};
export const getUserStart = () =>{
    return{
        type: actionTypes.GET_USER_START    
    }
}

export const getUserSucess = (userData,status) =>{
    return{
        type: actionTypes.GET_USER_SUCCESS,
        userData: userData,
        getSucessCode: status     
    }
}

export const getUser=(userId)=>{
    return dispatch=>{
         dispatch(getUserStart());
        axios.get('https://reqres.in/api/users/'+ userId)
        .then(response =>{
         console.log(response.data)
  
              dispatch(getUserSucess(response.data,response.status));
        })
        .catch(error=>{
            console.log(error)
        })
    }
    
}

export const deleteStart = (userId) =>{

    return{
        type: actionTypes.DELETE_START,
        userId: userId
    }
}

export const deleteSuccess = (status)=>{
     return{
        type: actionTypes.DELETE_USER,
        status: status,
      
     }
}
export const deleteUser = (userId) =>{
    return dispatch =>{
        dispatch(deleteStart(userId));

        axios.delete('https://reqres.in/api/users/'+ userId)
          .then(response=>{
                console.log(response.status);
                 dispatch(deleteSuccess(response.status))
          })
          .catch(error=>{
              
          });
    };

};
export const fetchUsersStart = () =>{
   return {
       type: actionTypes.FETCH_USERS_START
   };
};

export const fetchUsersSucces = (users) =>{
    return{
        type: actionTypes.FETCH_USERS_SUCESS,
        users:  users
    };
};

export const fetchUsersFail = (error) =>{
    return{
        type: actionTypes.FETCH_USERS_FAIL,
        error: error
    };

};

export const fetchUsers = (pageId) =>{
    return  dispatch =>{
        dispatch(fetchUsersStart());
        
        axios.get('https://reqres.in/api/users?page='+ pageId)
           .then(response =>{
               console.log(response.data);
               dispatch(fetchUsersSucces(response.data.data));
           })
           .catch(err =>{
               dispatch(fetchUsersFail(err));
           });
    }
}