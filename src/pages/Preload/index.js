import React, {useEffect, useContext} from 'react';
import {LogBox} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import db from './../../config/firebaseconfig';
import { getDoc, doc } from 'firebase/firestore/lite';
import {Container, Logo, LoadingIcon} from './styles';

import {UserContext} from './../../contexts/UserContext';

export default () => {

    // Ignora o aviso de deprecated do firebase
    LogBox.ignoreAllLogs();

    const {dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() => {

        const checkUid = async () => {
            const uid = await AsyncStorage.getItem('@uid');
            if(uid != null){

                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);

                if(docSnap.exists()){

                    const data = [
                        {
                            type: 'Login',
                            site: 'Google',
                            user: 'soaressd01@gmail.com',
                            pass: '12345678'
                        }, 
                        {
                            type: 'Login',
                            site: 'Microsoft',
                            user: 'soaressd01@gmail.com',
                            pass: '12345678'
                        }, 
                        {
                            type: 'Login',
                            site: 'Amazon',
                            user: 'soaressd01@gmail.com',
                            pass: '12345678'
                        }, 
                        {
                            type: 'Login',
                            site: 'HBO',
                            user: 'soaressd01@gmail.com',
                            pass: '12345678'
                        }, 
                    ];
                    await AsyncStorage.setItem('@passes', JSON.stringify(data));

                    userDispatch({
                        type: 'setUser',
                        payload: {
                            name: docSnap.data().name,
                            email: docSnap.data().email
                        }
                    });

                    navigation.reset({
                        routes: [{name: 'SignIn'}]
                    });
                }
            }else{
                console.log('não existe');
            }
        }

        checkUid();
    }, []);

    return(
        <Container>
            <Logo>Locky</Logo>
            <LoadingIcon size='large' color='#8aa29e' />
        </Container>
    );
}