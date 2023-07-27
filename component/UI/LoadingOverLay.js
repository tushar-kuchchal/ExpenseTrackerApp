import {View,StyleSheet,ActivityIndicator} from 'react-native'
import { GlobalStyle } from '../../constants/styles'
function LoadingOverLay(){
    return <View style={styles.container}>
        <ActivityIndicator size='large' color="white" />

    </View>
}
export default LoadingOverLay
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:24,
        backgroundColor:GlobalStyle.colors.primary500

    }
})