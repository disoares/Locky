import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #3d5467;
`;

export const Logo = styled.Text`
    font-size: 60px;
    color: #8aa29e;
    margin-top: 80px;
    margin-bottom: 40px;
`;

export const SignInArea = styled.View`
    flex: 1;
    margin-top: 40px;
    padding: 40px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background-color: #f1edee;
`;

export const LoginText = styled.Text`
    color: #8aa29e;
    align-self: center;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 20px;
`;

export const SignInButtonArea = styled.TouchableOpacity`
    height: 50px;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    border-radius: 10px;    
    background-color: #db5461;
`;

export const SignInButtonText = styled.Text`
    color: #f1edee;
    font-size: 18px;
`;

export const PlainTextCentered = styled.Text`
    color: #3d5467;
    align-self: center;
    margin-top: 40px;    
`;

export const SignUpButtonArea = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const SignUpButtonText = styled.Text`
    color: #db5461;
    font-weight: 500;
`;

export const LoadingIcon = styled.ActivityIndicator`
`;