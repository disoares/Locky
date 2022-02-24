import React, {useState, useContext} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
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
import {setDoc, doc} from 'firebase/firestore/lite';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import db, { auth } from './../../config/firebaseconfig';

import {UserContext} from '../../contexts/UserContext';
import CustomInput from '../../components/CustomInput';

export default () => {

    const {dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[pass, setPass] = useState('');
    const[confirmPass, setConfirmPass] = useState('');
    const[loading, setLoading] = useState(false);

    const handleSignIn = () => {
        navigation.goBack();
    }

    const handleSignUp = () => {

        let hasError = false;

        if(name === ''){
            Alert.alert('Preenchimento incorreto', 'O campo NOME não pode ficar vazio.', [{text: 'OK'}]);
            hasError = true;
        }else if(email === ''){
            Alert.alert('Preenchimento incorreto', 'O campo E-MAIL não pode ficar vazio.', [{text: 'OK'}]);
            hasError = true;
        }else if(pass === '' || confirmPass === ''){
            Alert.alert('Preenchimento incorreto', 'O campo SENHA MASTER não pode ficar vazio.', [{text: 'OK'}]);
            hasError = true;
        }else if(pass !== confirmPass){
            Alert.alert('Preenchimento incorreto', 'Os campos de senha não correspondem.', [{text: 'OK'}]);
            hasError = true;
        }

        if(!hasError){
            Alert.alert(
                'Confirmação de senha', 
                'Essa será a sua senha master. Tem certeza que deseja utilizá-la?', 
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                        onPress: () => {
                            setPass('');
                            setConfirmPass('');
                        }
                    },                
                    {
                        text: 'Sim, quero usar!',
                        onPress: async () => {
                            setLoading(true);

                            createUserWithEmailAndPassword(auth, email, pass)
                            .then(async (cred) => {
                              
                                const uid = cred.user.uid;
            
                                const docRef = doc(db, 'users', uid);
                                const payload = {name: name, email: email};

                                await setDoc(docRef, payload)
                                .then(async () => {

                                    await AsyncStorage.setItem('@uid', uid);
                                    userDispatch({
                                        type: 'setUser',
                                        payload: {
                                            uid: uid,
                                            name: name,
                                            email: email
                                        }
                                    });
                    
                                    setLoading(false);

                                    navigation.reset({
                                        routes: [{name: 'Home'}]
                                    });

                                })
                                .catch((err) => {
                                    setLoading(false);
                                    console.log(err.message);
                                })
                            }).catch((err) => {
                                setEmail('');
                                setLoading(false);
                                if(err.toString().includes('email-already-in-use')){
                                    Alert.alert('E-mail já cadastrado', 'Por favor, utilize outro e-mail.', [{
                                        text: 'OK'
                                    }]);
                                }
                            })
                        }
                    }
                ]
            )
        }
    }

    return(
        <Container>
            <Logo>Locky</Logo>
            <SignInArea>
                <LoginText>Cadastrar</LoginText>
                <CustomInput placeholder="Digite o seu nome" value={name} onChangeText={t=>setName(t)} />
                <CustomInput placeholder="Digite o seu e-mail" value={email} onChangeText={t=>setEmail(t)} />
                <CustomInput placeholder="Digite a sua senha master" value={pass} onChangeText={t=>setPass(t)} pass={true} />
                <CustomInput placeholder="Confirme a sua senha master" value={confirmPass} onChangeText={t=>setConfirmPass(t)} pass={true} />
                <SignInButtonArea onPress={handleSignUp} disabled={loading}>
                    {!loading ? 
                        <SignInButtonText>CADASTRAR</SignInButtonText>
                        :
                        <LoadingIcon size='small' color='#ffffff' />
                    }                    
                </SignInButtonArea>
                <PlainTextCentered>Já tem conta?</PlainTextCentered>
                <SignUpButtonArea onPress={handleSignIn}>
                    <SignUpButtonText>Faça o login!</SignUpButtonText>
                </SignUpButtonArea>
            </SignInArea>
        </Container>
    );
}