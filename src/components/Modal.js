import React, {useState} from "react";
import styled from "styled-components/native";
import {MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addDoc, collection, doc, setDoc } from 'firebase/firestore/lite';
import db from './../config/firebaseconfig';

import Toast from "react-native-root-toast";

const ModalArea = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    margin-top: 22px;
    background-color: rgba(0, 0, 0, .6);
`;

const Modal = styled.Modal`
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    left: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
`;

const ModalBody = styled.View`
    width: 90%;
    min-height: 350px;
    background-color: #f1edee;
    border-radius: 6px;    
    padding: 35px;
    shadow-color: #000;
    shadow-offset: {
        width: 0;
        height: 2;
    };
    shadow-opacity: 0.25px;
    shadow-radius: 4px;
    elevation: 5px;
`;

const Title = styled.Text`
    font-size: 22px;
    margin-top: 20px;
`;

const FormArea = styled.View`    
`;

const Label = styled.Text`
    font-size: 16px;
    margin-top: 20px;
`;

const Input = styled.TextInput`
    border-bottom-width: 1px;
    border-bottom-color: #8aa29e;
    font-size: 20px;
`;

const ButtonsArea = styled.View`
    flex-direction: row;
    justify-content: center;
`;

const SaveButton = styled.Pressable`
    background-color: #db5461;
    padding: 15px 40px;
    justify-content: center;
    align-items: center;    
    margin-top: 20px;
    border-radius: 6px;
`;

const SaveButtonText = styled.Text`
    color: #f1edee;
    font-size: 20px;
`;

const LoadingIcon = styled.ActivityIndicator``;

export default ({showModal, setShowModal, title, id, employee, type, pass, setEmployee, setType, setPass, updPasses, setUpdPasses}) => {

    const[loading, setLoading] = useState(false);

    const handleSavePass = async () => {

        const uid = await AsyncStorage.getItem('@uid');
        if(uid){
            if(employee === ''){
                alert('Campo "Empresa" é obrigatório');
                return;
            }

            if(pass === ''){
                alert('Campo "Senha" é obrigatório');
                return;
            }

            setLoading(true);

            if(id === '' || id === undefined){

                const collectionRef = collection(db, 'passes');
                const payload = {
                    uid: uid,
                    employee: employee,
                    type: type,
                    pass: pass
                };
                await addDoc(collectionRef, payload)
                .then((res) => {

                    Toast.show('Senha salva com sucesso!', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0
                    });

                    setShowModal(false);

                })
                .catch(err => {
                    alert('Houve um erro. Tente de novo.');
                });

            }else{

                const docRef = doc(db, 'passes', id);
                const payload = {
                    uid: uid,
                    employee: employee,
                    type: type,
                    pass: pass
                };
                await setDoc(docRef, payload)
                .then((res) => {
                    Toast.show('Senha salva com sucesso!', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0
                    });

                    setShowModal(false);
                })
                .catch(err => {
                    alert('Houve um erro. Tente de novo.');
                });

            }

            setUpdPasses(updPasses+1);
            setLoading(false);
        }
    }

    return(
        <ModalArea>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(false);
                }}
            >
                <ModalArea>
                    <ModalBody>
                        <CloseButton onPress={() => setShowModal(false)}>
                            <MaterialIcons name="keyboard-arrow-down" size={30} color="#3d5467" />
                        </CloseButton>
                        <Title>{title}</Title>
                        <FormArea>
                            <Label>Empresa</Label>
                            <Input placeholder='Empresa/Site' value={employee} onChangeText={t => setEmployee(t)} />
                            <Label>Tipo</Label>
                            <Input placeholder='Descrição' value={type} onChangeText={t => setType(t)} />
                            <Label>Senha</Label>
                            <Input placeholder='********' value={pass} onChangeText={t => setPass(t)} secureTextEntry={true} />
                        </FormArea>
                        <ButtonsArea>
                            <SaveButton onPress={handleSavePass} disabled={loading ? true : false}>
                                {loading ?                                     
                                    <LoadingIcon size='small' color='#f1edee' />
                                :
                                    <SaveButtonText>Salvar</SaveButtonText>
                                }
                            </SaveButton>
                        </ButtonsArea>
                    </ModalBody>
                </ModalArea>
            </Modal>
        </ModalArea>
    );
}