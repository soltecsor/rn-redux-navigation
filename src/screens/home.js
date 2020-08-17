import React, { Component } from "react";
import { View, Text, StatusBar, ScrollView, Button } from "react-native";

import CustomButton from "../components/button";
import CustomLoading from "../components/loading";
import DrawerHeader from '../components/header'

import Styles, { COLOR } from "../config/styles";

import Icon from "react-native-vector-icons/FontAwesome";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import getdata from "../actions/getdata";
import { connect } from "react-redux";
import { authenticate } from "../reducers";

class Home extends Component {
    
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        return (
            <View style={[Styles.container, { padding: 0 }]}>
                <View style={Styles.header}>
                    <DrawerHeader
                        headerTitle="Home"
                        icon="menu"
                        onPress={() => this.props.navigation.openDrawer()}
                    />
                </View>
                <View
                    style={{
                        // flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 64
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#ffffff10",
                            borderRadius: 96,
                            width: 192,
                            height: 192,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Icon name="home" size={128} color={COLOR.LIGHT_GRAY} />
                    </View>
                    <Text
                        style={{
                            color: COLOR.PANTOME,
                            margin: 8,
                            fontSize: 20,
                            marginTop: 16
                        }}
                    >
                        {`Olá, ${this.props.state.authSession.username ||
                            "Visitante"}!`}
                    </Text>
                </View>
                <View
                    style={{
                        position: "absolute",
                        bottom: 32,
                        left: 16,
                        right: 16,
                        height: 40
                    }}
                >
                    <CustomButton onPress={this.props.actions.logout} title={"SAIR"} />
                </View>
                <CustomLoading text={"Saindo..."} loading={this.props.state.clearingAuth} />
            </View>
        );
    }
}

export default connect(
    state => ({ state: state.authenticate }),
    dispatch => ({
        actions: bindActionCreators({authActions:authActions,getdata:getdata}, dispatch)
    })
)(Home);
