import React from 'react';
import { Button } from 'react-native';
import { readUserData } from '../../firebase/database';

export const ReadDataComponent = () => {

    const handlerSaveData = () => {
        readUserData()
    }

    return (
        <Button
            onPress={handlerSaveData}
            title="Leer datos"
            color="#841584"
        />
    )
}
