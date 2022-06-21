import React, { useEffect, useState } from "react";
import { List } from 'react-native-paper';
import {  IconButton} from 'react-native-paper';
import { ActivityIndicator, MD2Colors, Button, Paragraph, Dialog,  Provider, Portal } from 'react-native-paper';
import { View , ScrollView} from 'react-native';

const ShowReports = ({handleSumit, data, visible, hideDialog}) => {
  
  return (    
            <Dialog  visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Informes</Dialog.Title>

                <Dialog.ScrollArea style={{padding:0, width:"100%"}}>
                    <ScrollView style={{ width:"100%", padding:0}}>
                        <List.Section  >
                            {console.log(data)}
                            {data.map((report) => (
                                <List.Item
                                title={report.description}
                                description={new Date(report.date).toLocaleDateString()}
                                left={(props) => <List.Icon  style={{ padding:0, marginLeft:0, marginRight:0}} icon="file-document" />}
                            />
                            ))}  
                                        
                        </List.Section>
                    </ScrollView>
                </Dialog.ScrollArea>
               
               
            </Dialog>
  );
}

export default ShowReports;