import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
    width: 100%;
    height: 50px;
    background-color: #3d5467;
    flex-direction: row;
    border-radius: 10px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;

const Input = styled.TextInput`
    flex: 1;
    color: #f1edee;
`;

export default ({placeholder, value, onChangeText, pass}) => {
    return(
        <InputArea>
            <Input 
                placeholder={placeholder} 
                placeholderTextColor="#8aa29e" 
                value={value} 
                onChangeText={onChangeText} 
                secureTextEntry={pass}
            />
        </InputArea>
    );
}