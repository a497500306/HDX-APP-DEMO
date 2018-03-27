import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Platform,
    ActivityIndicator,
    Alert,
    ListView,
    DeviceEventEmitter
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
import Tab from '../Tab'
import Moment from 'moment'
Moment().format();
import Toast from'../../../node_modules/antd-mobile/lib/toast/index'
import Radio from'../../../node_modules/antd-mobile/lib/radio/index'
const RadioItem = Radio.RadioItem;
import List from'../../../node_modules/antd-mobile/lib/list/index'
import TextareaItem from'../../../node_modules/antd-mobile/lib/textarea-item/index'
import Settings from '../../Tool/Settings'
import User from '../../Tool/User'

export default class Questionnaire extends Component{
    //state
    constructor(props){
        super(props);
        this.state = {
            dataSource:null,
            selectData:[],
            data:null,
            text:'',
            responseJson:null
        };
    }

    // 加载完成 复杂的操作:定时器\网络请求
    componentDidMount(){
        Toast.loading('请稍候',60);
        //发送登录网络请求
        fetch('https://ffeb8020-8134-4daf-8fda-04ad189426d2.mock.pstmn.io/api/surveys/1', {
            method: 'GET',
            headers: {
                'Bearer' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                for (let i = 0; i < responseJson.questions.length; i++){
                    if (responseJson.questions[i].answer.type !== 'Free-Text'){
                        this.state.selectData.push([]);
                    }
                }
                var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                this.setState({
                    responseJson:responseJson,
                    dataSource: ds.cloneWithRows(responseJson.questions),
                    data:responseJson.questions
                });
                Toast.hide()
                // if (responseJson.error !== null){
                //     Alert.alert(
                //         '温馨提示',
                //         responseJson.error.message,
                //         [
                //             {text: '确定'}
                //         ]
                //     );
                // }
            })
            .catch((error) => {//错误
                Toast.hide()
                Toast.fail('请检查您的网络!!!', 1);
            });
    }

    // 退出时调用
    componentWillUnmount() {

    }

    render() {
        if (this.state.dataSource === null){
            return (
                <View style={styles.container}>
                    
                </View>
            )
        }else {
            return (
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.dataSource}//数据源
                        renderRow={this.renderRow.bind(this)}
                    />
                </View>
            )
        }
    }

    //返回具体的cell
    renderRow(rowData,sID,rID){
        var views = [];
        var selectType = this.state.selectData[rID];
        if (rowData.answer.type === 'Free-Text'){
            views.push(
                <View key = '111'>
                <TextareaItem
                    key = '333'
                    title="标题"
                    placeholder="请输入内容..."
                    data-seed="logId"
                    rows={5}
                    onChange={this.customFocusInst.bind(this)}
                />
                
                <TouchableOpacity key = '222' style={styles.dengluBtnStyle} onPress={this.getDetermine.bind(this)}>
                        <Text style={{color:'white',fontSize: 14,marginLeft:15}}>
                            提 交
                        </Text>
                        <ActivityIndicator
                            animating={false}
                            style={[styles.centering, {height: 30}]}
                            size="small"
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            )
        }else {

            for (let i = 0 ; i < rowData.answer.format.length ; i++){
                views.push(
                    <RadioItem checked = {selectType.indexOf(i) === -1 ? false : true} key={i+'R'} onChange = {()=> this.onChange(i,sID,rID)}>{rowData.answer.format[i]}</RadioItem>
                )
            }
        }
        return(
            <View>
                <List renderHeader={() => rowData.desc}>
                    {views.map((elem, index) => {
                        return elem;
                    })}
                </List>
            </View>
        )
    }

    //点击确定
    getDetermine(){
        for (var i = 0 ; i < this.state.selectData.length ; i++){
            if (this.state.selectData[i].length === 0){
                //错误
                Alert.alert(
                    '温馨提示',
                    '问卷未全部完成',
                    [
                        {text: '确定'}
                    ]
                )
                return;
            }
        }

        if (this.state.text.length === 0){
            //错误
            Alert.alert(
                '温馨提示',
                '问卷未全部完成',
                [
                    {text: '确定'}
                ]
            )
            return;
        }

        DeviceEventEmitter.emit('getHome');
        return;
        
        Toast.loading('请稍候',60);
        

        let answers = [];
        for (let i = 0 ; i < this.state.selectData.length ; i++){
            answers.push({
                questionId:this.state.selectData[i].id,
                type:this.state.selectData[i].answer.type,
                // answer:
            })
        }
        let json = {
            id:this.state.responseJson.id,
            date : moment().format("YYYY-MM-DD"),
            answers : answers
        }
        //发送登录网络请求
        fetch(Settings.Url + "/api/surveys/1/answers", {
            method: 'POST',
            headers: {
                'Bearer': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json)
        })
            .then((response) => response.json())
            .then((responseJson) => {
            console.log('12123123123123');
            console.log(responseJson);
                Toast.hide()
                User.Token = responseJson.id_token;
                this.props.navigation.navigate('SetUserData')
            })
            .catch((error) => {//错误
                Toast.hide()
                Toast.fail('请检查您的网络!!!', 1);
            });
    }

    //输入
    customFocusInst(text){
        this.setState({
            text:text
        })
    }
    //点击选择
    onChange(i,sID,rID){
        console.log(sID+'qqqqqq'+rID)
        let data = this.state.data[rID];
        var selectType = this.state.selectData[rID];
        if (data.answer.type === 'Multi-Select'){//多选
            if (selectType.indexOf(i) == -1){
                selectType.push(i);
            }else{
                var index = selectType.indexOf(i);
                while(index>-1){
                    selectType.splice(index, 1);
                    index = selectType.indexOf(i);
                }
            }
        }else{
            selectType.length === 0 ? selectType.push(i) : selectType.splice(0,1,i);
        }
        this.state.selectData.splice(rID,1,selectType);
        //更新列表
        var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(this.state.data),
        });
    }

}

const styles = StyleSheet.create({
    container:{

    },

    dengluBtnStyle:{
        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',
        // 设置主轴的对齐方式
        justifyContent:'center',
        width:width - 40,
        marginTop:20,
        marginBottom:20,
        marginLeft:20,
        height:40,
        backgroundColor:'rgba(48,192,255,1.0)',
        // 设置圆角
        borderRadius:5,
    },
})