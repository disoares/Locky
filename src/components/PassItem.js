import React from 'react';
import styled from 'styled-components/native';

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
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: 10px;
`

const EditButton = styled.TouchableOpacity`
    width: 100px;
    justify-content: center;
    align-items: center;
    background-color: #8aa29e;
    padding: 5px;
    border-radius: 5px;
`;

const DeleteButton = styled.TouchableOpacity`
    width: 100px;
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

export default ({employee, type, pass}) => {
    return (
        <Area>
            <FieldArea>
                <Field placeholder='Empresa' value={employee}  />
            </FieldArea>
            <FieldArea>
                <Field placeholder='Tipo' value={type} />
            </FieldArea>
            <FieldArea>
                <Field placeholder='*********' value={pass} secureTextEntry={true} />
            </FieldArea>
            <ActionsArea>
                <EditButton>
                    <PlainText>Editar</PlainText>
                </EditButton> 
                <DeleteButton>
                    <PlainText>Deletar</PlainText>
                </DeleteButton>
            </ActionsArea>
        </Area>
    );
}