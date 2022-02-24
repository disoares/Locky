import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    padding: 10px;
    background-color: #3d5467;
`;

export const Title = styled.Text`
    font-size: 40px;
    margin-top: 20px;
    margin-bottom: 40px;
    color: #8aa29e;
`;

export const SearchArea = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 50px;
    padding: 5px 5px 5px 10px;
    border-radius: 5px;
    background-color: #ffffff;
    margin-bottom: 20px;
`;

export const SearchInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    margin-left: 15px;
    margin-right: 15px;
`;

export const PassArea = styled.View`
    flex: 1;
    width: 100%;    
`;

export const ScrollView = styled.ScrollView`
    width: 100%;
    padding: 10px;
`;

export const FalseView = styled.View`
    height: 80px;
`;

export const FloatButtonArea = styled.TouchableOpacity`
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: #8aa29e;
    padding: 10px;    
`;