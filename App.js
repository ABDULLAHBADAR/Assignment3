import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet,TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataTable } from 'react-native-paper';
import AssetExample from './components/AssetExample';
import { Card } from 'react-native-paper';

function App1({route, navigation }) {
  const [input1, setinput1] = useState("");
  const [input2, setinput2] = useState("");
  const [valMsg, setValMsg] = useState([]);
  const [originalPrice, setoriginalPrice] = useState(0);

  const [discountt, setDisocunt] = useState(0);
const [youSaveVal, setSaveVal] = useState(0);
const [discountedPrice, setDiscountedPrice] = useState(0);
const [getItemsList,setItemsList] = useState([]);
const [getcounter, setCounter] = useState(0);
  navigation.setOptions({
      headerRight: () => (
      <Text onPress={() => {
            navigation.navigate('History', {
            list:getItemsList})
            setCounter(0);
            }
          } style={{color:'Black',marginRight:10,fontSize:15}}>History</Text>
      ),
    });

 if(route.params!=null){
   
 const {dataList}=route.params;
if(getcounter==0){
  setCounter(-1);
if(dataList.length==0){
  var key=-11111;
  setItemsList(getItemsList.filter(item=>item.key==key))
}else{

for(var i=0; i<getItemsList.length;i++){
  var flag=0;

  for(var j=0; j<dataList.length;j++){
    if((getItemsList[i].orgP==dataList[j].orgP)&&(getItemsList[i].disP==dataList[j].disP)){
      flag+=1;
    }
}
 
if(flag==0){
  setItemsList(getItemsList.filter(item=>item.key!=getItemsList[i].key))
}
}

}
 }
 }
  function ValidatePrice(text){
  if(text<0){
    setValMsg((valMsg) => {
                valMsg[0] = "Price should be a positive number."
                return valMsg;
            });
    setoriginalPrice(0);
    setDiscountedPrice("null");
  }else{
    setoriginalPrice(text);
    setinput1(text);
     setValMsg((valMsg) => {
                valMsg[0] = ""
                return valMsg;
            });
  }

}
function Discount (){
if(originalPrice ==0 ){
  setDiscountedPrice("null");
  setSaveVal("null");
}else{
 var dis = originalPrice * (discountt/100);
 dis=dis.toFixed(2);
 setSaveVal(dis);
 var priceFinal=originalPrice - dis;
 priceFinal=priceFinal.toFixed(2);
 setDiscountedPrice(priceFinal);
}
}
const AddData = () => {

  var flag=0;
  for (var i=0; i<getItemsList.length;i++){
  
       if(getItemsList[i].orgP == originalPrice && getItemsList[i].disP == discountt){
          flag++;
       }
  }

  if(flag>0){
    alert("Record Existed in History. Change field values.")
  }else{
    
    setItemsList([...getItemsList,{orgP:originalPrice,disP:discountt,price:discountedPrice}]);
    alert("Record Saved.");
    }
    
}
function Validation(t){
  if(t>100){

    setValMsg((valMsg) => {
                valMsg[1] = "Discount Value should not be greater than 100"
                return valMsg;
            });
    setDisocunt(0);
  }else{
    setDisocunt(t);
    setinput2(t);
    setValMsg((valMsg) => {
                valMsg[1] = ""
                return valMsg;
            });
  }
}
useEffect(() =>{
  Discount();
})


  return (
    <View style={styles.container}>
      <View style={{flex:1,justifyContent:'center',alignItems:'center', marginVertical:10}}>
      <Text  style={styles.Text}>Retail Price</Text>
      <TextInput 
      keyboardType = 'number-pad'
      style={styles.Field}
      placeholder='Price'
      value={input1}
      onChangeText={text => ValidatePrice(text)}
      />
      <Text style={{fontSize:15, color:'red'}}>{valMsg[0]}</Text>
      </View>

      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text  style={styles.Text}>Discount Percentage</Text>
      <TextInput 
      keyboardType = 'number-pad'
      style={styles.Field}
      placeholder='Discount'
      value={input2}
      onChangeText={text => Validation(text)}
      />
      <Text style={{fontSize:15, color:'red', margin:5}}>{valMsg[1]}</Text>
      </View>
      <Text >Amount Saved</Text>
      <Text style={styles.Text}>{youSaveVal}</Text>
      </View>
      
      <View style={{flex:1, flexDirection:"column",justifyContent:'center',alignItems:'center'}}>    
      <Text  style={styles.Text}>Price After Discount</Text>
      <Text style={{ fontSize:15,paddingRight:10}}> {discountedPrice}</Text>
      </View>
      <View style={{flex:1, flexDirection:"row",justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity
      onPress={AddData}
      disabled={(discountt==0) && (originalPrice==0)}
      style={styles.Btn}
      >
      <Text style={{color:'grey'}}>Save</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
}
function History ({route, navigation }) {
  
 var data = route.params.list;
 const [getList,setList] = useState(data); 
const removeData =(key)=>{

  data=data.filter(item=>item.key!=key)
  setList(data);
}


const clear =()=>{

var key=-1;
  data=data.filter(item=>item.key==key)
  setList(data);
}
  return (

    <View style={styles.Records,{backgroundColor:'white'}}>

    <DataTable>
    <DataTable.Header>
      
      <DataTable.Title numeric >original</DataTable.Title>
      <DataTable.Title numeric >Discount</DataTable.Title>
      <DataTable.Title numeric> Final Price</DataTable.Title>
      <DataTable.Title numeric >Options</DataTable.Title>
    </DataTable.Header>

    
    {
    getList.map((item) => (
      <DataTable.Row>
        
        <DataTable.Cell numeric>{item.orgP}</DataTable.Cell>
        <DataTable.Cell numeric>{item.disP}</DataTable.Cell>
        <DataTable.Cell numeric>{item.price}</DataTable.Cell>
        <DataTable.Cell numeric>
        <TouchableOpacity
        style={{backgroundColor:'#696969', padding:7,borderRadius:50}}
        onPress={()=>removeData(item.key)}
        >
        <Text style={{color:'white'}}>Remove</Text>
        </TouchableOpacity>
        </DataTable.Cell>

        
      </DataTable.Row>
      
    ))
  }
  </DataTable> 
  <View style={{flexDirection:'row'}}>
  <TouchableOpacity
      onPress={clear}
      style={styles.Btn}
      >
      <Text style={{color:'grey'}}>Clear All</Text>
      </TouchableOpacity>
       <TouchableOpacity
      onPress={() => navigation.navigate('Home', {
            dataList:getList
          })
          }
      style={styles.Btn}
      >
      <Text style={{color:'grey'}}>Go To Home Screen</Text>
      </TouchableOpacity>
      </View>
</View>
  );
}
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen
          name="Home"
          component={App1}
          options={({ navigation, route }) => ({
             title:'Home',
             headerStyle:{
               height:75,

             }
          })}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={({ navigation, route }) => ({
           title:'History ',
           headerLeft:null
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    padding: 8
    // ,alignItems:"center"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Field: {
    marginHorizontal:20,
    marginBottom:10,
    borderWidth:2,
    borderRadius:50,
    width:'50%',
    height:'10%',
    padding:25,
    width:150,
    borderColor:'grey',
    marginBottom:30,
  },
  Text: {
    color:'grey',
    fontSize:15,
    marginBottom:5
    
    
  },
  Btn :{
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    color:'grey',
    width:'50%',
    padding:10,
    borderRadius:50,
    borderWidth:2,
    borderColor:'grey',
  },
});
export default App;
