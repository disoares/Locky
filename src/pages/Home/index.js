import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import db from './../../config/firebaseconfig';

import { Container, Title, SearchArea, SearchInput, PassArea, ScrollView, FalseView, FloatButtonArea, LoadingIcon } from './styles';

import PassItem from './../../components/PassItem';
import Modal from '../../components/Modal';
import ModalView from '../../components/ModalView';

export default () => {

    const [updPasses, setUpdPasses] = useState(0);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [arrPass, setArrPass] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [id, setId] = useState('');
    const [employee, setEmployee] = useState('');
    const [type, setType] = useState('');
    const [pass, setPass] = useState('');

    useEffect(() => {
        const getPasses = async () => {

            if (search === '') {
                setArrPass([]);
                setLoading(true);

                const uid = await AsyncStorage.getItem('@uid');
                if (uid) {
                    const q = query(collection(db, `passes`), where('uid', '==', uid));
                    const getPasses = await getDocs(q);

                    let passes = [];
                    getPasses.forEach((doc) => {
                        let curDoc = {
                            id: doc.id,
                            ...doc.data()
                        }
                        passes.push(curDoc);
                    })

                    setArrPass(passes);
                    setLoading(false);
                }
            } else {
                const filterPasses = arrPass.filter(s => s.employee.toLowerCase().indexOf(search.toLowerCase()) > -1);
                setArrPass(filterPasses);
            }
        }
        getPasses();
    }, [updPasses, search]);

    const handleOpenModal = () => {
        setId('');
        setEmployee('');
        setType('');
        setPass('');

        setTitleModal('Nova senha');
        setShowModal(true);
    }

    return (
        <Container>
            <StatusBar hidden={true} />
            <Title>Locky</Title>
            <SearchArea>
                <FontAwesome name='search' size={24} color="#8aa29e" />
                <SearchInput placeholder="Digite a sua pesquisa" value={search} onChangeText={t => setSearch(t)} />
            </SearchArea>
            <ScrollView>
                {arrPass.length > 0 ?
                    <PassArea>
                        {arrPass.map((item, key) => (
                            <PassItem
                                key={key}
                                id={item.id}
                                employee={item.employee}
                                type={item.type}
                                pass={item.pass}
                                setId={setId}
                                setEmployee={setEmployee}
                                setType={setType}
                                setPass={setPass}
                                setShowModal={setShowModal}
                                setTitleModal={setTitleModal}
                                updPasses={updPasses}
                                setUpdPasses={setUpdPasses}
                                setShowModalView={setShowModalView}
                            />
                        ))}
                    </PassArea>
                    :
                    (loading &&
                        <LoadingIcon size='large' color='#f1edee' />)
                }
                <FalseView />
            </ScrollView>
            <FloatButtonArea onPress={handleOpenModal}>
                <FontAwesome name='plus' size={24} color="#f1edee" />
            </FloatButtonArea>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                title={titleModal}
                id={id}
                employee={employee}
                type={type}
                pass={pass}
                setEmployee={setEmployee}
                setType={setType}
                setPass={setPass}
                updPasses={updPasses}
                setUpdPasses={setUpdPasses}
            />
            <ModalView
                showModal={showModalView}
                setShowModal={setShowModalView}
                employee={employee}
                type={type}
                pass={pass}
            />
        </Container>
    );
}
