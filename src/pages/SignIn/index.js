import React, { useState, useEffect, useContext } from 'react';
import { Alert, LogBox } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import db from './../../config/firebaseconfig';
import { getDoc, doc } from 'firebase/firestore/lite';
import {auth} from './../../config/firebaseconfig';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {
    Container, 
    Logo, 
    SignInArea, 
    LoginText, 
    SignInButtonArea, 
    SignInButtonText, 
    PlainTextCentered,
    SignUpButtonArea,
    SignUpButtonText,
    LoadingIcon
} from './styles';

import {UserContext} from './../../contexts/UserContext';
import CustomInput from '../../components/CustomInput';

export default () => {

    // Ignora o aviso de deprecated do firebase
    LogBox.ignoreAllLogs();

    const {state, dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();

    const[email, setEmail] = useState('');
    const[pass, setPass] = useState('');
    const[showEmail, setShowEmail] = useState(true);
    const[loading, setLoading] = useState(false);

    useEffect(() => {

        const loadEmail = () => {            
            const {email: userEmail} = state;
            if(userEmail !== ''){
                setEmail(userEmail);
                setShowEmail(false);
            }
        }

        loadEmail();
    }, []);

    const handleSignIn = () => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, pass)
        .then(async (cred) => {

            const uid = cred.user.uid;
            
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){

                await AsyncStorage.setItem('@key', uid);
                await AsyncStorage.setItem('@uid', uid);
                userDispatch({
                    type: 'setUser',
                    payload: {
                        uid: uid,
                        name: docSnap.data().name,
                        email: docSnap.data().email
                    }
                });

            }

            setLoading(false);

            navigation.reset({
                routes: [{name: 'Home'}]
            });
        })
        .catch((err) => {
            setLoading(false);
            if(err.toString().includes('auth/wrong-password')){
                Alert.alert('Oops...', 'Usuário e/ou senha incorreto.', [{text: 'OK'}])
            }
        })
    }

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    }

    return(
        <Container>
            <Logo>Locky</Logo>
            <SignInArea>
                <LoginText>Login</LoginText>
                {showEmail && 
                    <CustomInput placeholder="Digite o seu e-mail" value={email} onChangeText={t=>setEmail(t)} />
                }
                <CustomInput placeholder="Digite a sua senha master" value={pass} onChangeText={t=>setPass(t)} pass={true} />
                <SignInButtonArea onPress={handleSignIn} disabled={loading}>
                    {!loading ? 
                        <SignInButtonText>LOGIN</SignInButtonText>
                        :
                        <LoadingIcon size='small' color='#ffffff' />
                    }
                </SignInButtonArea>
                <PlainTextCentered>Ainda não tem conta?</PlainTextCentered>
                <SignUpButtonArea onPress={handleSignUp}>
                    <SignUpButtonText>Cadastre-se!</SignUpButtonText>
                </SignUpButtonArea>
            </SignInArea>
        </Container>
    );
}