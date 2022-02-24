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
    color: #f1edee;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 30px;
`;