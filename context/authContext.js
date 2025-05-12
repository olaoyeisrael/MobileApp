// import { createContext, useContext, useEffect, useState } from "react";
// import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
// import {auth, db} from '../firebaseConfig'
// import {doc, getDoc, setDoc} from 'firebase/firestore'


// export const AuthContext = createContext();

// export const AuthContextProvider = ({children})=>{
//     const [user, setUser] = useState(null)
//     const [isAuthenticated, setIsAuthenticated] = useState(undefined)

//     useEffect(()=>{
//         const unsub = onAuthStateChanged(auth, (user)=>{
//             if (user){
//                 setIsAuthenticated(true);
//                 setUser(user)
//             }
//             else{
//                 setIsAuthenticated(false);
//                 setUser(null)
//             }
//         });
//         return unsub

//     },[])

//     const login = async (email, password)=>{
//         try{
//             const response = await signInWithEmailAndPassword(auth, email, password);
//             return{success: true};

//         } catch(e){
//             let msg = e.message
//             if (msg.includes('(auth/invalid-email)')) msg = "invalid email"
//             if (msg.includes('(auth/invalid-credential)')) msg = "Wrong Credentials"
//             return{
//                 success: false, msg
//             };
//         }
//     }
//     const logout = async ()=>{
//         try{
//             await signOut(auth);
//             return {success: true}
//         } catch(e){
//             return{ success: false, msg: e.message, error: e}

//         }
//     }
//     const register = async (email, password, fullName)=>{
//         try{
//             const response = await createUserWithEmailAndPassword(auth, email, password)
//             console.log('response.user:', response?.user)

//             await setDoc(doc(db,'users', response?.user?.uid),{
//                 fullName,
//                 email,
//                 userId: response?.user?.uid
//             })
//             return {success: true, data: response?.user}
//         } catch(e){
//             let msg = e.message
//             if (msg.includes('(auth/invalid-email)')) msg = "invalid email"
//             if (msg.includes('(auth/email-already-in-use)')) msg = "The email is already in use"
//             if (msg.includes('(auth/weak-password)')) msg = "Weak password. Password should be at least 6 characters"
//             return{
//                 success: false, msg
//             };
//         }
//     }
//     return(
//         <AuthContext.Provider value={{user, isAuthenticated, login, logout, register}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export const useAuth =()=>{
//     const value = useContext(AuthContext);

//     if(!value){
//         throw new Error('useAuth must be wrapped inside AuthContext')
//     }
//     return value
// }




import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { token, user } = res.data;
    await AsyncStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    setAuthenticated(true);
    return{success: true};
  };

  const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        console.log('response received')
        const { token, user } = response.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userId', user.id);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user);
        setAuthenticated(true);
        setToken(token)
        return{success: true};
    } 
    catch(e){
      console.log("Login error:", e);
            let msg = e.response?.data?.message || err.response?.data?.error || 'Login failed'
                if (msg.includes('User not found')) msg = "user does not exist or invalid email"
                if (msg.includes('Invalid credentials')) msg = "Wrong Credentials"
                return{
                    success: false, msg
                };
  };}

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId')
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setAuthenticated(false);
    return {success: true}
  };

  const loadUser = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await api.get('/auth/profile');
        setUser(res.data);
        setAuthenticated(true);
      } catch (err) {
        await AsyncStorage.removeItem('token');
        setUser(null);
        setAuthenticated(false);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth =()=>{
    const value = useContext(AuthContext);

    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContext')
    }
    return value
}