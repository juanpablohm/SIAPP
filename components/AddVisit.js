import React, { useEffect, useRef, useState } from "react";
import { List } from 'react-native-paper';
import {  IconButton} from 'react-native-paper';
import { ActivityIndicator, MD2Colors, Paragraph, Dialog,  Provider, Portal,TextInput,  Button } from 'react-native-paper';
import { View , ScrollView} from 'react-native';

//import SignatureScreen from "react-native-signature-canvas";
import Signature from "react-native-signature-canvas";
import DateTimePicker from '@react-native-community/datetimepicker';

const AddVisit = ({handleSumit, id, visible, hideDialog, dataModel}) => {

  const [data, setData] = useState(dataModel);

  const [enable, setEnable] = useState(false);

  const showDate = () => { setEnable(true);}

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    console.log(typeof signature);
    setData({...data, professorSign: signature});
  };


  return (   
            <Dialog  visible={visible} onDismiss={() =>{setData({practicaId: 0, date: new Date(), professorSign:null });hideDialog()}}>
                <Dialog.Title>Agregar control visita</Dialog.Title>
            
                <Dialog.Content>

                <TextInput
                    mode="outlined"
                    label="Fecha visita"
                    disabled={true}
                    value={data.date.toLocaleDateString()}
                    right={<TextInput.Icon onPress={(event) => {showDate()}} name="calendar" />}
                />

                {enable && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={data.date}
                    mode={'date'}
                    is24Hour={true}
                    onChange={(event, selectedDate) => {setEnable(false);setData({ ...data, date: selectedDate}); }}
                    />
                )}

               
                  
                <View style={{ marginTop:20, width: "100%", height:350}}>

                    <Signature
                    // handle when you click save button
                    onOK={(img) => handleOK(img)}
                    clearText="Limpiar"
                    confirmText="Confirmar"
                    descriptionText="Firma"
                    onClear={(event) => { setData(dataModel)}}
                    // description text for signature
                    
                    autoClear={false}
                    imageType={"image/png"}
                    />
                </View>                                    
                </Dialog.Content>   
                <Dialog.Actions>
                    
                    <Button color="black" disabled={data.professorSign != null ? false : true} mode="contained"  onPress={() => {handleSumit(data, id); hideDialog()}}>Guardar</Button>
               </Dialog.Actions> 
               
            </Dialog>
  );
}

export default AddVisit;