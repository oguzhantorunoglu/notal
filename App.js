import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, StatusBar, FlatList, RefreshControl, Alert } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import { NoteCard } from './src/components/cards';
import { Input } from './src/components/Inputs';

const App = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [noteCount, setNoteCount] = useState(0);

  const onPress = async () => {
    if(!text){
      return;
    }

    const newList = JSON.stringify([...list, {text:text, active:true}])
    await AsyncStorage.setItem('notes', newList);
    getNotes();
    setText("");
  };

  const cardPress = async (item) => {
    const notes = await AsyncStorage.getItem('notes');
    try{
      if (notes != null){
        const parseData = JSON.parse(notes);
        const index = parseData.map(e => e.text.toLowerCase()).indexOf(item.text.toLowerCase());
        parseData.splice(index, 1);
        parseData.splice(index, 0, {...item, active:!item.active});
        await AsyncStorage.setItem('notes', JSON.stringify(parseData));
        getNotes();
      }
      else{
        alert("İşlem Başarısız.");
      }
    }
    catch(err){
      alert("İşlem Başarısız.");
    }
  };

  const cardLongPress = async (item) => {
    const notes = await AsyncStorage.getItem('notes');
    try{
      if (notes != null){
        const parseData = JSON.parse(notes);
        const index = parseData.map(e => e.text.toLowerCase()).indexOf(item.text.toLowerCase());
        parseData.splice(index, 1);
        await AsyncStorage.setItem('notes', JSON.stringify(parseData));
        getNotes();
      }
      else{
        alert("Silme İşlemi Başarısız.");
      }
    }
    catch(err){
      alert("Silme İşlemi Başarısız.");
    }
  };

  const clear = () =>
    Alert.alert(
      "HEPSİNİ SİL",
      "Bu işlemi yaparsanız kaydettiğiniz tüm notlar silinecektir. Yinede silmek istiyor musunuz?",
      [
          {
              text:"İptal",
              onPress: () => {},
              style: "cancel"
          },
          { 
              text:"Hepsini Sil", 
              onPress: async () => {
                await AsyncStorage.removeItem("notes");
                getNotes();
              }
          }
      ]
    );

  const onRefresh = () => {
    setIsRefresh(true)
    getNotes();
    setIsRefresh(false)
  };

  const getNotes = async () => {
    const notes = await AsyncStorage.getItem('notes');
    if (notes != null){
      const parseData = JSON.parse(notes);
      setList(parseData);

      let Filtercount = 0;
      parseData.map((item) => {
        for (const [key, value] of Object.entries(item)) {
          if (value === true){
              Filtercount = Filtercount + 1
          }
        }
        setNoteCount(Filtercount);
      })
    }
    else{
      setList([]);
      setNoteCount(0);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const renderItem = ({item}) => {
    return(
      <NoteCard
        text={(item?.text) ? item?.text : ""}
        active={(!item?.active) ? item?.active : true}
        onPress={() => cardPress(item)}
        longPress={() => cardLongPress(item)}
      />
    )
  };

  return(
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#04151c" barStyle={"light-content"} />

        <TouchableOpacity 
          style={styles.clear}
          onPress={clear}
        >
          <Text style={styles.clear_text}>Temizle</Text>
        </TouchableOpacity>

        <View style={styles.note_count_container}>
          <Text style={styles.note_count_text}>YAPILACAKLAR</Text>
          <Text style={styles.note_count_text}>{noteCount}</Text>
        </View>

        <FlatList
          data={list}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          ListFooterComponent={<View style={{marginBottom:"20%"}}/>}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={    
            <RefreshControl         
                refreshing={isRefresh}
                onRefresh={onRefresh} 
            />
          }
        />

        <View style={styles.input_container}>
          <Input 
            text={text}
            setText={setText} 
            placeholder={"Yapılacak..."} 
            buttonText={"Kaydet"} 
            onPress={onPress}
          />
        </View>
    </SafeAreaView>
  )
};

export default App;


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#04151c"
  },
  input_container:{
    width:"94%",
    marginHorizontal:"3%",
    marginTop:"5%"
  },
  clear_text:{
    fontWeight:"500",
    fontSize:18,
    color:"white",
  },
  clear:{
    alignItems:"center",
    justifyContent:"center",
    marginBottom:"3%",
    borderBottomWidth:1,
    borderColor:"#2c647a",
    paddingBottom:10
  },
  note_count_container:{
    paddingHorizontal:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  note_count_text:{
    fontWeight:"500",
    fontSize:24,
    color:"#f0ae35",
  }
});