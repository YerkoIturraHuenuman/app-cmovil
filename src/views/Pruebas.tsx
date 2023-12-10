import React, { useEffect, createContext, useContext, useState } from "react";
import { format, utcToZonedTime } from "date-fns-tz";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Text,
} from "react-native";

//--------------------------------------------------------------------------------------

export default function Pruebas({ navigation }: any) {
  //------------------------SET GENERALES--------------------------

  //------------------------FUNCIONES PRINCIPALES--------------------------

  //------------------------PROCESOS--------------------------

  const tiempo = tiempoTranscurrido(obtenerFechaActual());

  return (
    <View style={styles.body}>
      <View style={styles.contenedorPrincipal}>
        <Text>Pagina de pruebas</Text>
        <Text>{tiempo}</Text>
      </View>
    </View>
  );
}

function tiempoTranscurrido(fechaPasada: Date): string {
  const fechaActual = new Date();
  const fechaActualChilena = utcToZonedTime(fechaActual, "America/Santiago");

  const diferenciaMillis = fechaActualChilena.getTime() - fechaPasada.getTime();
  const segundosTranscurridos = Math.floor(diferenciaMillis / 1000);
  const minutosTranscurridos = Math.floor(segundosTranscurridos / 60);
  const horasTranscurridas = Math.floor(minutosTranscurridos / 60);
  const diasTranscurridos = Math.floor(horasTranscurridas / 24);
  const mesesTranscurridos = Math.floor(diasTranscurridos / 30);
  const añosTranscurridos = Math.floor(mesesTranscurridos / 12);

  if (segundosTranscurridos < 60) {
    return "Hace un momento";
  } else if (minutosTranscurridos === 1) {
    return "Hace 1 minuto";
  } else if (minutosTranscurridos < 60) {
    return `Hace ${minutosTranscurridos} minutos`;
  } else if (horasTranscurridas === 1) {
    return "Hace 1 hora";
  } else if (horasTranscurridas < 24) {
    return `Hace ${horasTranscurridas} horas`;
  } else if (diasTranscurridos === 1) {
    return "Hace 1 día";
  } else if (diasTranscurridos < 30) {
    return `Hace ${diasTranscurridos} días`;
  } else if (mesesTranscurridos === 1) {
    return "Hace 1 mes";
  } else if (mesesTranscurridos < 12) {
    return `Hace ${mesesTranscurridos} meses`;
  } else if (añosTranscurridos === 1) {
    return "Hace 1 año";
  } else {
    return `Hace ${añosTranscurridos} años`;
  }
}
function obtenerFechaActual(): Date {
  const fechaActual = new Date();
  const fechaActualChilena = utcToZonedTime(fechaActual, "America/Santiago");
  const fechaActualChilenaFormateada = format(
    fechaActualChilena,
    "yyyy-MM-dd HH:mm:ss",
    { timeZone: "America/Santiago" }
  );
  const fechaActualChilenaDate = new Date(fechaActualChilenaFormateada);
  return fechaActualChilenaDate;
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  contenedorPrincipal: {
    flex: 1,
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
