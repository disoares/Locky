import React from "react";
import styled from "styled-components/native";
import {FontAwesome } from '@expo/vector-icons';
import Toast from "react-native-root-toast";
import * as Clipboard from 'expo-clipboard';

const ModalArea = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 22px;
    background-color: rgba(0, 0, 0, .6);
`;

const Modal = styled.Modal`
`;

const ModalBody = styled.View`
    width: 70%;
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
    align-self: center;
    font-size: 20px;
    margin-bottom: 20px;
`;

const FormArea = styled.View`    
`;

const PassArea = styled.View``;

const Label = styled.Text`
    font-size: 16px;
    color: #8aa29e;    
`;

const Input = styled.TextInput`
    font-size: 20px;
    margin-bottom: 20px;
    color: #686963;
`;

const CopyButton = styled.TouchableOpacity`
    position: absolute; 
    right: 0px;
`;

const ButtonArea = styled.Pressable`
    width: 150px;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
    align-self: center;
    padding: 8px 15px;
    background-color: #8aa29e;
    border-radius: 6px;
`;

const ButtonText = styled.Text`
    color: #f1edee;
    font-size: 20px;
`;

export default ({showModal, setShowModal, employee, type, pass}) => {

    const handleCopy = (pass) => {
        Clipboard.setString(pass);

        Toast.show('Senha copiada com sucesso!', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });

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
                        <Title>Cuidado para ninguém ver...</Title>
                        <FormArea>
                            <Label>Empresa</Label>
                            <Input value={employee} editable={false} selectTextOnFocus={false} />
                            <Label>Tipo</Label>
                            <Input value={type} editable={false} selectTextOnFocus={false}  />
                            <Label>Senha</Label>
                            <PassArea>
                                <Input value={pass} editable={false} selectTextOnFocus={false} />
                                <CopyButton onPress={() => handleCopy(pass)}>
                                    <FontAwesome name='copy' size={24} color="#3d5467" />
                                </CopyButton>
                            </PassArea>
                        </FormArea>
                        <ButtonArea onPress={() => setShowModal(false)}>
                            <ButtonText>Fechar</ButtonText>
                        </ButtonArea>
                    </ModalBody>
                </ModalArea>
            </Modal>
        </ModalArea>
    );
}