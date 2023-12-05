import React from 'react';
import { Button } from 'react-native';
import { writeUserData } from '../../firebase/database';

export const WriteDataComponent = () => {

    const user = {
        usario505: {
            name: 'test',
            email: 'jamon'
        }
    }

    const handlerSaveData = () => {
        writeUserData(user)
    }

    return (
        <Button
            onPress={handlerSaveData}
            title="Guardar datos"
            color="#841584"
        />
    )
}
