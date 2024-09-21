import react, {useState, useEffect} from 'react';

const AuthContext = react.createContext({
    isLoggedIn:false,
    onLogout : ()=> {},
    onLogin : (email, password)=> {}
});

export const AuthContextProvider = (props) =>{

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInUserDetail = localStorage.getItem("loggedInValue");
    
        if(loggedInUserDetail === '1'){
          setIsLoggedIn(true);
        }
      }, []);

    const loginHandler = (email, password) => {
        localStorage.setItem("loggedInValue", "1");
        setIsLoggedIn(true);
      };
    
    const logoutHandler = () => {
        localStorage.removeItem("loggedInValue");
        setIsLoggedIn(false);
      };


    return(<AuthContext.Provider
    value={{
        isLoggedIn: isLoggedIn,
        onLogout:logoutHandler,
        onLogin:loginHandler
    }}>{props.children}</AuthContext.Provider>)
}

export default AuthContext;