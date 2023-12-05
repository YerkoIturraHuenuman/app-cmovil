import React from 'react'
import { StatusBar, View, StyleSheet } from 'react-native';
import { ReadDataComponent } from '../components/databaseComponents/ReadDataComponent';
import { WriteDataComponent } from '../components/databaseComponents/WriteDataComponent';

export const DatabaseScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar />
            <ReadDataComponent />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});