import {useEffect} from "react";
import { useAuthContext, useUserContext, useVariablesContext } from "../contexts/VariablesContext";

import { WriteDataComponent } from "../components/databaseComponents/WriteDataComponent";
import { logIn, signIn } from "../firebase/auth";
import { InterUsuario, Usuario } from "../interfaces/products.interface";

import { getUser } from "../firebase/database";

export default function useAuth(props: any){

    const {
        setLoading,
        setError,
        toggle,
        setToggle  
    } = useVariablesContext();

    const {
        email,
        password,
        setKeyUser,
        setCorrectData
    } = useUserContext();

    const {
        setTitle,
        setTitleBoton,
        setMensaje
    } = useAuthContext();


    const handlerRegister = async () => {
        setLoading(true);
        setError(undefined);
        setMensaje(undefined);
    
        const user = await signIn(email, password);
        console.log("Datos del registro: ", user);
        if (user) {
          const objectUser: InterUsuario = {
            userID: user.uid,
            userEmail: user.email,
            PublicacionID: null,
            direccion: null,
            coordenadasPublicacion: null,
            url_img: null,
            registroCompleto: false,
          };
    
          WriteDataComponent(objectUser, 1);
          setLoading(false);
          setTitle("Inicio Sesión");
          setTitleBoton("Login");
          setMensaje("Usuario creado, inicia sesión");
          setToggle(!toggle);
        } else {
          setError("Usuario ya está registrado!");
          setLoading(false);
        }
    };

    const handlerLogin = async () => {
        setLoading(true);
        setError(undefined);
        setMensaje(undefined);
    
        const successLogin = await logIn(email, password);
        if (successLogin.res) {
          console.log("id de login: ", successLogin.userID);
          setKeyUser(successLogin.userID);
          setLoading(false);
          const user = (await getUser(successLogin.userID)) as Usuario;
          console.log(
            "Usuario: ",
            user.email,
            "Registro Completo: ",
            user.registroCompleto
          );
          if (!user.registroCompleto) {
            props.navigation.navigate("RegistroAvatar");
          } else if (user.registroCompleto) {
            props.navigation.navigate("Home");
            props.navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }
        } else {
          setError("Usuario no registrado!");
          setLoading(false);
        }
    };

    const handlerLoginGoogle = () => {};
    
    useEffect(() => {
        if (email !== "" && password !== "") {
        setCorrectData(false);
        } else {
        setCorrectData(true);
        }
    }, [email, password]);

    return{
        handlerLogin,
        handlerRegister,
        handlerLoginGoogle
    }
}