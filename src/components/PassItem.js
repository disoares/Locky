import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Toast from 'react-native-root-toast';
import {FontAwesome } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as LocalAuthentication from 'expo-local-authentication';
import { 
    hasHardwareAsync,
    isEnrolledAsync,
    authenticateAsync 
 } from 'expo-local-authentication';
import { deleteDoc, doc } from 'firebase/firestore/lite';
import db from './../config/firebaseconfig';

const Area = styled.View`
    width: 100%;
    background-color: #ffffff;
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 5px;
`;

const FieldArea = styled.View`
    margin-bottom: 5px;
`;

const Field = styled.TextInput`
    color: #000;
    font-size: 18px;
    border-bottom-width: 1px;
    border-bottom-color: #dddddd;
    border-radius: 5px;
    padding: 5px;
`;

const ActionsArea = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`

const ViewButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
    background-color: #3d5467;
    padding: 5px;
    border-radius: 5px;
`;

const EditButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
    background-color: #8aa29e;
    margin-left: 5px;
    padding: 5px;
    border-radius: 5px;
`;

const DeleteButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
    background-color: #db5461;
    margin-left: 5px;
    padding: 5px;
    border-radius: 5px;
`;

const PlainText = styled.Text`
    font-size: 18px;
    color: #ffffff;
`;

export default ({id, employee, type, pass, setId, setEmployee, setType, setPass, setShowModal, setTitleModal, updPasses, setUpdPasses, setShowModalView}) => {

    const[showAlert, setShowAlert] = useState(false);
    const[showSupportedAlert, setShowSupportedAlert] = useState(false);
    const[isSupported, setIsSupported] = useState(false);
    const[permission, setPermission] = useState(false);

    useEffect(async () => {
        const compatible = await hasHardwareAsync()
        if (compatible){
            setIsSupported(true);
        }
    }, []);

    const handleView = async () => {

        let show = false;

        if(!isSupported && !permission){
            setShowSupportedAlert(true);
        }else if(!isSupported && permission){
            show = true;
        }else{
            const result = await authenticateAsync();
            if (result.success){
                show = true;
            }
        }

        if(show){
            setEmployee(employee)
            setType(type)
            setPass(pass)
            setShowModalView(true);
        }

    }

    const handleEdit = async (id, employee, type, pass) => {

        let show = false;

        if(!isSupported && !permission){
            setShowSupportedAlert(true);
        }else if(!isSupported && permission){
            show = true;
        }else{
            const result = await authenticateAsync();
            if (result.success){
                show = true;
            }
        }

        if(show){
            setId(id)
            setEmployee(employee)
            setType(type)
            setPass(pass)
    
            setShowModal(true);
            setTitleModal('Editar senha');
        }

    }

    const handleDelete = async () => {

        let show = false;

        if(!isSupported && !permission){
            setShowSupportedAlert(true);
        }else if(!isSupported && permission){
            show = true;
        }else{
            const result = await authenticateAsync();
            if (result.success){
                show = true;
            }
        }

        if(show){
            setShowAlert(true);
        }        
    }

    const handleDeleteConfirm = async () => {

        await deleteDoc(doc(db, 'passes', id))
        .then((res) => {

            Toast.show('Senha removida com sucesso!', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0
            });

            setUpdPasses(updPasses+1);

        })
        .catch(err => {
            alert('Houve um erro. Tente novamente.');
        });

        setShowAlert(false);
    };
    
    const hideAlert = () => {
        setShowAlert(false);
        setShowSupportedAlert(false);
    };

    return (
        <Area>
            <FieldArea>
                <Field placeholder='Empresa' value={employee} editable={false} selectTextOnFocus={false} />
            </FieldArea>
            <FieldArea>
                <Field placeholder='Tipo' value={type} editable={false} selectTextOnFocus={false} />
            </FieldArea>
            <FieldArea>
                <Field placeholder='*********' value={pass} secureTextEntry={true} editable={false} selectTextOnFocus={false} />             
            </FieldArea>
            <ActionsArea>
                <ViewButton onPress={() => handleView(id)}>
                    <FontAwesome name='eye' size={24} color="#f1edee" />
                </ViewButton> 
                <EditButton onPress={() => handleEdit(id, employee, type, pass)}>
                    <PlainText>
                        <FontAwesome name='edit' size={24} color="#f1edee" />
                    </PlainText>
                </EditButton> 
                <DeleteButton onPress={() => handleDelete(id)}>
                    <PlainText>
                        <FontAwesome name='trash' size={24} color="#f1edee" />
                    </PlainText>
                </DeleteButton>
            </ActionsArea>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Você está certo disso?"
                message="Você tem certeza que quer excluir essa senha?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Cancelar"
                confirmText="Quero excluir!"
                confirmButtonColor="#db5461"
                onCancelPressed={hideAlert}
                onConfirmPressed={handleDeleteConfirm} 
            />
            <AwesomeAlert
                show={showSupportedAlert}
                showProgress={false}
                title="A biometria não está ativada ou não é suportada."
                message="Isso torna o app menos seguro. Deseja continuar?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não"
                confirmText="Sim"
                confirmButtonColor="#db5461"
                onCancelPressed={hideAlert}
                onConfirmPressed={t => setPermission(true)}
            />
        </Area>
    );
}