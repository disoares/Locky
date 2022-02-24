import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesome } from '@expo/vector-icons';

import {Container, Title, SearchArea, SearchInput, PassArea, ScrollView, FalseView, FloatButtonArea} from './styles';

import PassItem from './../../components/PassItem';

export default () => {

    const[search, setSearch] = useState('');

    useEffect(() => {
        const getPasses = async () => {
            const passes = await AsyncStorage.getItem('@passes');
            if(passes != null){
                const getPasses = JSON.parse(passes);
                getPasses.map((item) => {
                    console.log(item.pass);
                })
            }
        }
        getPasses();
    }, []);

    const handleTypeSearch = (t) => {
        setSearch(t);
    }

    return (
        <Container>
            <StatusBar hidden={true} />
            <Title>Locky</Title>
            <SearchArea>
                <FontAwesome name='search' size={24} color="#8aa29e" />
                <SearchInput placeholder="Digite a sua pesquisa" value={search} onChangeText={(t) => handleTypeSearch(t)} />
            </SearchArea>
            <ScrollView>
                <PassArea>                
                    <PassItem employee='Google' type='Login' pass='12345678' />              
                </PassArea>
                <FalseView />
            </ScrollView>
            <FloatButtonArea>
                <FontAwesome name='plus' size={24} color="#f1edee" />
            </FloatButtonArea>
        </Container>
    );
}
