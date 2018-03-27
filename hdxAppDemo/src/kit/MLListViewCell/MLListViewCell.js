import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform
} from 'react-native';
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

export default class MLListViewCell extends Component {
    //传入值
    static defaultProps = {
        //cell的高度,默认iOS44 安卓54
        cellHeight: Platform.OS == 'ios' ? 44 : 54,
        //默认为屏幕宽度
        cellWidth: width,
        //是否显示右边箭头:默认显示
        isShowTip : true,
        //cell颜色
        cellColor: 'white',

        //左边图片地址(本地地址)
        leftImageLocalUrl: null,
        //左边图片地址(网络地址)
        leftImageUrl: '',
        //左边占位图片地址(本地地址:目前没用到)
        leftPlaceholderImage: '',
        //左边图片圆角
        leftImageFillet : 0,
        //左边图片对于cell的间距
        leftImageMargin : 10,
        //左边图片宽高:默认宽高
        leftImageWidth : Platform.OS == 'ios' ? 24 : 34,
        leftImageHeight : Platform.OS == 'ios' ? 24 : 34,

        //右边图片地址(本地地址)
        rightImageLocalUrl: null,
        //右边图片地址(网络地址)
        rightImageUrl: '',
        //右边占位图片地址(本地地址:目前没用到)
        rightPlaceholderImage: '',
        //右边图片圆角
        rightImageFillet : 0,
        //右边图片对于cell的间距
        rightImageMargin : 10,
        //右边图片宽高:默认宽高
        rightImageWidth : Platform.OS == 'ios' ? 24 : 34,
        rightImageHeight : Platform.OS == 'ios' ? 24 : 34,

        //左边上面文字
        leftHeadText:'',
        //左边上面文字颜色:默认黑色
        leftHeadTextColor:'black',
        //左边上面文字大小:默认14
        leftHeadTextSize:14,
        //左边两行文字的间距(上面文字下边距2,下面文字上边距2 == 总间距4)
        leftTextMargin : 2,

        //左边下面文字
        leftFootText:'',
        //左边下面文字颜色:默认灰色
        leftFootTextColor:'gray',
        //左边下面大小:默认12
        leftFootTextSize:12,

        //右边上面文字
        rightHeadText:'',
        //右边上面文字颜色:默认灰色
        rightHeadTextColor:'gray',
        //右边上面大小:默认12
        rightHeadTextSize:12,
        //右边两行文字的间距(上面文字下边距2,下面文字上边距2 == 总间距4)
        rightTextMargin : 2,

        //右边下面文字
        rightFootText:'',
        //右边下面文字颜色:默认灰色
        rightFootTextColor:'gray',
        //右边下面大小:默认12
        rightFootTextSize:12,

        //右下角小红点
        isRightFootRedDot : false,
        rightFootRedDotSize:10,
        rightFootRedDotRight:10,
        rightFootRedDotBottom:20,

        //设置下划线
        underlineWidth : width,
        underlineFarme : -1,
        //设置上面划线
        underlineTopWidth : width,
        underlineTopFarme : -1,

        //设置头像是否文字生成
        headText:'',
        //是否圆角
        headBorderRadius:0,
        //背景颜色
        headBackgroundColor : '#FF9600',
        //文字颜色
        headTextColor:'#FFFFFF',
        //文字大小
        headTextSize:16
    };

    constructor(props){
        super(props);
        this.state = {
            leftImage : require('./image/占位图.png'),
            rightImage : require('./image/占位图.png')
        };
    }

    //加载网络图片
    // componentDidMount(){
    //     console.log("11111111");
    //     console.log(Image.prefetch(this.props.leftImageUrl));
    //     this.state.leftImage = Image.prefetch(this.props.leftImageUrl);
    //     this.state.rightImage = Image.prefetch(this.props.rightImageUrl);
    // }

    render() {
        return(
            <View>

                {/*设置上划线*/}
                {this.rendUnderTopLine()}
                <View style={
                    [
                        {
                            borderBottomColor:'#EAEAEA',
                            borderBottomWidth:this.props.underlineFarme === -1 ? 0.5 : 0,
                            flexDirection:'row',
                            height:this.props.cellHeight,
                            width:this.props.cellWidth,
                            backgroundColor:this.props.cellColor,
                        }
                    ]
                }>
                    {/*设置箭头*/}
                    {this.renderRightTipView()}
                    {/*设置左边内容*/}
                    {this.renderLeftView()}
                    {/*设置右边内容*/}
                    {this.renderRightView()}
                    {/*设置小红点*/}
                    {this.rendRightFootRedDot()}
                </View>
                {/*设置下划线*/}
                {this.rendUnderLine()}
            </View>
        )
    }

    //设置右边箭头
    renderRightTipView(){
        if (this.props.isShowTip == true){
            return(
                <View style={{
                    height:this.props.cellHeight,
                    justifyContent:'center',
                    position:'absolute',
                    top:0,
                    right:15,
                }}>
                    <Image source={require('./image/tip.png')} style={{
                        width:16,
                        height:16
                    }}/>
                </View>
            )
        }
    }

    //设置左边内容
    renderLeftView(){
        //判断是否为网络图片
        if (this.props.leftImageUrl.length == 0){
            //查看是否有图片
            if (this.props.leftImageLocalUrl == null){
                //没有图片
                return(
                    <View style={{flexDirection:'row',}}>
                        {this.renderLeftTextView()}
                    </View>
                )
            }else {
                if (this.props.headText !== '') {
                    // console.log('909090')
                    return (
                        <View style={{flexDirection: 'row',}}>
                            <View style={{
                                justifyContent: 'center',
                                height: this.props.cellHeight,
                                marginLeft: this.props.leftImageMargin,
                            }}>
                                <View style={{
                                    backgroundColor: '#FF9600',
                                    width: this.props.leftImageWidth,
                                    height: this.props.leftImageHeight,
                                    borderRadius: this.props.headBorderRadius,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text  allowFontScaling={false}
                                     style={{
                                        color: this.props.headTextColor,
                                        fontSize: this.props.headTextSize,
                                    }}>{this.props.headText}</Text>
                                </View>
                            </View>
                            {this.renderLeftTextView()}
                        </View>
                    )
                } else {
                    //有本地图片
                    return (
                        <View style={{flexDirection: 'row',}}>
                            <View style={{
                                justifyContent: 'center',
                                height: this.props.cellHeight,
                                marginLeft: this.props.leftImageMargin,
                                borderRadius: this.props.leftImageFillet
                            }}>
                                <Image source={this.props.leftImageLocalUrl} style={[
                                    styles.image,
                                    {
                                        width: this.props.leftImageWidth,
                                        height: this.props.leftImageHeight,
                                        borderRadius: this.props.leftImageFillet
                                    }
                                ]}/>
                            </View>
                            {this.renderLeftTextView()}
                        </View>
                    )
                }
            }
        }else{
            //网络图片
            return(
                <View style={{flexDirection:'row',}}>
                    <View style={{
                        justifyContent:'center',
                        height:this.props.cellHeight,
                        marginLeft:this.props.leftImageMargin,
                    }}>
                        <Image
                            source={[{
                                uri: this.props.leftImageUrl,
                                width:this.props.leftImageWidth,
                                height:this.props.leftImageHeight
                            }]}
                            style={[
                                styles.image,
                                {
                                    width:this.props.leftImageWidth,
                                    height:this.props.leftImageHeight,
                                    borderRadius:this.props.leftImageFillet
                                }
                        ]}/>
                    </View>
                    {this.renderLeftTextView()}
                </View>
            )
        }
    }

    //设置右边内容
    renderRightView(){
        //判断是否为网络图片
        if (this.props.rightImageUrl.length == 0){
            //查看是否有图片
            if (this.props.rightImageLocalUrl == null){
                //没有图片
                return(
                    <View style={{
                        flexDirection:'row',
                        position:'absolute',
                        top:0,
                        right:this.props.isShowTip == true ? (10 + 16 + 10) : 10,
                    }}>
                        {this.renderRightTextView()}
                    </View>
                )
            }else{
                //有本地图片
                return(
                    <View style={{
                        flexDirection:'row',
                        position:'absolute',
                        top:0,
                        right:this.props.isShowTip == true ? (10 + 16 + 10) : 10,
                    }}>
                        {this.renderRightTextView()}
                        <View style={{
                            justifyContent:'center',
                            height:this.props.cellHeight,
                            marginLeft:this.props.leftImageMargin
                        }}>
                            <Image source={this.props.rightImageLocalUrl} style={[
                                styles.image,
                                {
                                    width:this.props.rightImageWidth,
                                    height:this.props.rightImageHeight,
                                    borderRadius:this.props.rightImageFillet
                                }
                            ]}/>
                        </View>
                    </View>
                )
            }
        }else{
            //网络图片
            return(
                <View style={{
                    flexDirection:'row',
                    position:'absolute',
                    top:0,
                    right:this.props.isShowTip == true ? (10 + 16 + 10) : 10
                }}>
                    {this.renderRightTextView()}
                    <View style={{
                        justifyContent:'center',
                        height:this.props.cellHeight,
                        marginLeft:this.props.leftImageMargin
                    }}>
                        <Image
                            source={[{
                                uri: this.props.rightImageUrl,
                                width:this.props.rightImageWidth,
                                height:this.props.rightImageHeight
                            }]}
                            style={[
                                styles.image,
                                {
                                    width:this.props.rightImageWidth,
                                    height:this.props.rightImageHeight,
                                    borderRadius:this.props.rightImageFillet
                                }
                        ]}/>
                    </View>
                </View>
            )
        }
    }


    //设置左边文本
    renderLeftTextView(){
        if (this.props.leftFootText.length == 0){
            //没有底部的文字
            return(
                <View style={{
                    height:this.props.cellHeight,
                    justifyContent:'center',
                    marginLeft:this.props.leftImageMargin
                }}>
                    <Text  allowFontScaling={false} style={{
                        color:this.props.leftHeadTextColor,
                        fontSize:this.props.leftHeadTextSize
                    }}>{this.props.leftHeadText}</Text>
                </View>
            )
        }else{
            //有底部的文字
            return(
                <View style={{
                    height:this.props.cellHeight,
                    justifyContent:'center',
                    marginLeft:this.props.leftImageMargin,
                }}>
                    <Text  allowFontScaling={false} style={{
                        color:this.props.leftHeadTextColor,
                        fontSize:this.props.leftHeadTextSize,
                        marginBottom:this.props.leftTextMargin
                    }}>{this.props.leftHeadText}</Text>
                    <Text  allowFontScaling={false} style={{
                        color:this.props.leftFootTextColor,
                        fontSize:this.props.leftFootTextSize,
                        marginTop:this.props.leftTextMargin,
                    }}>{this.props.leftFootText}</Text>
                </View>
            )
        }
    }

    //设置右边文本
    renderRightTextView(){
        if (this.props.rightFootText.length == 0){
            //没有底部的文字
            return(
                <View style={{
                    height:this.props.cellHeight,
                    justifyContent:'center',
                    alignItems:'flex-end'
                }}>
                    <Text  allowFontScaling={false} style={{
                        color:this.props.rightHeadTextColor,
                        fontSize:this.props.rightHeadTextSize
                    }}>{this.props.rightHeadText}</Text>
                </View>
            )
        }else{
            //有底部的文字
            return(
                <View style={{
                    height:this.props.cellHeight,
                    justifyContent:'center',
                    alignItems:'flex-end'
                }}>
                    <Text  allowFontScaling={false} style={{
                        color:this.props.rightHeadTextColor,
                        fontSize:this.props.rightHeadTextSize,
                        marginBottom:this.props.rightTextMargin,
                    }}>{this.props.rightHeadText}</Text>
                    <Text  allowFontScaling={false} style={{
                        color:this.props.rightFootTextColor,
                        fontSize:this.props.rightFootTextSize,
                        marginTop:this.props.rightTextMargin,
                    }}>{this.props.rightFootText}</Text>
                </View>
            )
        }
    }

    //设置小红点
    rendRightFootRedDot(){
        // console.log('更新小红点')
        // console.log(this.props.isRightFootRedDot)
        if (this.props.isRightFootRedDot === true){
            return(
                <View style={{
                    backgroundColor:'red',
                    position:'absolute',
                    right:this.props.rightFootRedDotRight,
                    bottom:this.props.rightFootRedDotBottom,
                    width:this.props.rightFootRedDotSize,
                    height:this.props.rightFootRedDotSize,
                    borderRadius: this.props.rightFootRedDotSize/2,
                }}/>
            )
        }else{
            return(
                <View style={{
                    backgroundColor:'rgba(0,0,0,0)',
                    position:'absolute',
                    right:this.props.rightFootRedDotRight,
                    bottom:this.props.rightFootRedDotBottom,
                    width:this.props.rightFootRedDotSize,
                    height:this.props.rightFootRedDotSize,
                    borderRadius: this.props.rightFootRedDotSize/2,
                }}/>
            )
        }
    }

    //设置下划线
    rendUnderLine(){
        if (this.props.underlineFarme !== -1){
            return(
                <View style={{
                    width:this.props.underlineWidth,
                    backgroundColor:'#EAEAEA',
                    height:0.5,
                    marginLeft:this.props.underlineFarme
                }}/>
            )
        }
    }

    //设置上划线
    rendUnderTopLine(){
        if (this.props.underlineTopFarme !== -1){
            return(
                <View style={{
                    width:this.props.underlineTopWidth,
                    backgroundColor:'#EAEAEA',
                    height:0.5,
                    marginLeft:this.props.underlineTopFarme
                }}/>
            )
        }
    }
}

const styles = StyleSheet.create({
    image:{
        resizeMode:'cover'
    }
});