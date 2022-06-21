import React, { useEffect, useState } from "react";
import { List } from 'react-native-paper';
import { Surface, Text, Modal, Portal, IconButton,  Snackbar } from 'react-native-paper';
import { Searchbar, Divider} from 'react-native-paper';

import {
  StyleProp,
  ViewStyle,
  Animated,
  StyleSheet,
  Platform,
  ScrollView,
  SafeAreaView,
  I18nManager,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getInternships, deleteInternshipById, createControlVisit } from "../api/internship/InternshipServices";
import { ActivityIndicator, MD2Colors, Button, Paragraph, Dialog, FAB, Chip } from 'react-native-paper';
import { ListItem } from "@react-native-material/core";
import {v4 as uuidv4} from "uuid";
import ShowReports from "../components/ShowReports";
import AddVisit from "../components/AddVisit";


const modelVisit =  {practicaId: 0, date: new Date(), professorSign:null };

const InternshipScreen = () => {

  const [report, setReport] = React.useState([]);

  const [internships, setInternships] = useState(null);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState(internships);
  const [id, setId] = useState(null);

  const [errorSend, setErrorSend] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [searchQuery, setSearchQuery] = React.useState('');

  const [visible, setVisible] = React.useState(false);

  const showDialog = (reports) => { setReport(reports);   setVisible(true);}

  const hideDialog = () => setVisible(false);

  const [visibleVisit, setVisibleVisit] = React.useState(false);

  const showDialogVisit = (id) => { setId(id);   setVisibleVisit(true);}

  const hideDialogVisit = () => setVisibleVisit(false);


  const onChangeSearch = query => setSearchQuery(query);

  const handleSearch = (value) => {

    setSearchQuery(value);
      
    const lowercasedValue = value.toLowerCase().trim();

    console.log(search);

    if(lowercasedValue === '') setInternships(search);
    else {
      const filteredData = internships.filter((item) => {
          return Object.keys(item).some((key) => 
                item[key]?.toString().toLowerCase().trim().includes(lowercasedValue)
          );
      });
      if(filteredData.length >= 1)
        setInternships(filteredData);
    }
  };


  const getInternshipsData = async () => { 
    try {
      
      let internshipResponse = await getInternships();     
      setInternships(internshipResponse);   
      setSearch(internshipResponse);
    }catch(e){
      console.log(e)
      setError(true);
      
    }
  };

  const handledCreateVisit = async (data, id) => { 
    try {
      data.practicaId = id;
      const dataSend = JSON.parse(JSON.stringify(data)); 

      let response = await createControlVisit(dataSend);

      console.log(response);
      if(response.ok){
        setErrorSend(false);
        setOpenConfirm(true);
        getInternshipsData();
      }   
    }catch(e){
      console.log(e)
      setErrorSend(true);
      setOpenConfirm(true);  
    }
  };

  useEffect(() => {
    getInternshipsData();
  }, []);

  const getDialogConfirmation = (isError) => {

    let texto = "Se ha creado el control visita exitosamente!";
    let tipo = "success"

    if(isError){

        texto = "Ha ocurrido un error, intentelo más tarde!";                   
        tipo  = "error";
    }

    return texto;
  }

  const noInterships = ()=>{
    return(
      <Surface style={{ alignItems: 'center', justifyContent: 'center', height: "85%", width: "100%"}}> 
         <Text variant="headlineSmall"> No se ha encontrado ninguna practica</Text>
      </Surface>
    );
  }

  const noVisits = ()=>{
    return(
      <Surface style={{padding:15}}>           
         <Chip icon="information" mode="flat" style={{width:'70%', backgroundColor:'white', marginLeft:40}} >No hay visitas</Chip>                                                  
      </Surface>
    );
  }

  if(error){
    return ( 
      <Surface style={{ alignItems: 'center', justifyContent: 'center', height: "90%", width: "100%"}}> 
          <Surface style={{backgroundColor:'red', padding:15, alignItems: 'center',borderRadius:3, justifyContent: 'center'}} elevation={10} > 
              <Text style={{color:"white"}} variant="headlineMedium">Ocurrio un error, por favor intentelo más tarde!</Text>
          </Surface>
      </Surface>
    );
  } else if(internships === null) {
    return ( 
      <Surface style={{ alignItems: 'center', justifyContent: 'center', height: "90%", width: "100%"}}> 
            <ActivityIndicator color="black" size="large" animating={true}  />
      </Surface>
    );
  }

  
  return (
      <SafeAreaView style={styles.container}> 

              <Surface  elevation={0}>
              <Searchbar
                placeholder="Buscar practica"
                onChangeText={handleSearch}
                value={searchQuery}
              />  
              </Surface>
            
              {internships.length < 1 ? ( 
                        noInterships()
              ) : (       
              <View style={{height:"100%"}}>
               
              <ScrollView  showsVerticalScrollIndicator={false} style={{ flex:1,   backgroundColor:"transparent", border:0}}>          
             
                  <Surface style={styles.surface} elevation={0}>
                    <List.Section style={{ width:"100%",backgroundColor:"transparent"}} >
                      {internships.map((internship) => (
                        <>
                          <Surface  elevation={7}>
                            <List.Accordion 
                              title={internship.studentName}
                              description={internship.companyName}
                              left={props => <Icon {...props} style={{margin:10}} color="black" size={35} name="clipboard-account" />}>      
                                {internship.controlVisitas < 1 ? (noVisits()) : (
                                  < >
                                    {internship.controlVisitas.map((visita) => (
                                        <List.Item left={props =>  <List.Icon  icon="calendar-check" />} title={new Date(visita.date).toLocaleDateString() + " - " + new Date(visita.date).toLocaleTimeString() } />
                                    ))}                                 
                                  </>
                                )}  
                              <List.Item   right={props => <><IconButton  icon="calendar-alert" size={30} onPress={() => {showDialog(internship.reports)}}/><IconButton icon="eye-plus" size={30} onPress={() => {showDialogVisit(internship.id)}}/></>  }/>             
                            </List.Accordion>
                          </Surface>

                          <Divider style={{width:"100%", marginBottom:30}}/>
                        </>
                        ))}       
                    </List.Section>
                  </Surface>

                  
              </ScrollView>
              </View>
             )} 

            <ShowReports data={report}  visible={visible} hideDialog={hideDialog}/>


            <AddVisit id={id} visible={visibleVisit} hideDialog={hideDialogVisit} dataModel={modelVisit} handleSumit={handledCreateVisit} />
        
            <Snackbar
              visible={openConfirm}
              onDismiss={() => {console.log("dimiss")}}
              action={{
                label: 'Aceptar',
                onPress: () => {
                  setError(false);
                  setOpenConfirm(false);
                },
              }}>
              {getDialogConfirmation(errorSend)}
            </Snackbar>


     </SafeAreaView>
    );
}

/* const styles = StyleSheet.create({
  surface: {
    padding: 15,
    alignItems: 'center',
  },
}); */

const styles = StyleSheet.create({
  container: {
    flexGrow: 2,
    height:"80%",
    padding: 10,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
  surface: {
    flexGrow: 2,
    padding: 15,
    backgroundColor: "transparent",
    border:0
  },
});


export default InternshipScreen;

