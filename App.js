import * as React from 'react';
import { Text, View, StyleSheet, Modal, Pressable, Image, FlatList, TextInput } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const ShowDetalhes = ({display, toogleModal, hp, attack, defense, name}) => (   
    <Modal
          animationType="fade"
          transparent={true}
          visible={display}
          onRequestClose={toogleModal}
    >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                <Pressable onPress={toogleModal}>
                  <Text>{name}</Text>
                  <Text>.</Text>
                  <Text>HP: {hp}</Text>
                  <Text>Attack: {attack}</Text>
                  <Text>Defense: {defense}</Text>
                </Pressable>
          </View>
        </View>
    
    </Modal>
        
 )

const Pokemon = ({name, link}) => {
  const [modal, setModal] = React.useState(false)

  function mudaModal(){
    setModal(!modal)
  }

  var hp = 'aa';
  var attack = 'bb';
  var defense = 'cc';

  return (
    <View>
      <ShowDetalhes display={modal} toogleModal={mudaModal} hp={hp} attack={attack} defense={defense} name={name}/>
      
      <Pressable onPress={mudaModal} style={styles.modalView}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: link,
          }}
        />
        <Text style={styles.paragraph}>{name}</Text>
      </Pressable>
    </View>
  )
}



async function executeGet(url,jsonState){
    //get síncrono com o uso do fetch
    await fetch(url)
    .then(response => {
          if (response.status === 200) {
            console.log('sucesso');
            response.json().then(function(result){ 

              jsonState([result])

              });
          } else {
            throw new Error('Erro ao consumir a API!');
          }
      })
      .then(response => {
        //console.debug(response);
      }).catch(error => {
        console.error(error);
      });
  }


export default function App() {

  const [jsonData, setJsonData] = React.useState({})
  const [idPokemon, setIdPokemon] = React.useState("");
  
  var id = idPokemon;

  if (idPokemon === "") {
    id = 25;
  } else {
    id = idPokemon;
  }

  executeGet("https://pokeapi.co/api/v2/pokemon/"+id,setJsonData)

  //função que renderiza cada item do FlatList
  function meuItem({item}){
    return(
      <Pokemon 
        name={item.name}
        link={item.sprites.front_default}
      />
    )
  }
  
  return (

    <View style={styles.container}>
  

      <TextInput
        style={styles.input}
        onChangeText={setIdPokemon}
        value={idPokemon}
        placeholder = "Informe o nome do Pokemon..."
        placeholderTextColor = "white"
      />
  
      <FlatList
        data={jsonData}
        renderItem={meuItem}
        keyExtractor={item => item.id}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#4682B4',
    padding: 8,
  },
  paragraph: {
    margin: 12,
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white'
  },
  tinyLogo: {
    width: 150,
    height: 100,
    alignSelf: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
  input: {
    color: 'white',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});