import React, { Component } from "react";
import { SafeAreaView, ScrollView, View, Image, Text } from 'react-native';
import { DrawerItems, DrawerActions } from "react-navigation";
import CustomButton from '../components/button'
import CustomLoading from '../components/loading'

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";

class DrawerComponent extends Component {
    render() {
        return (
            <SafeAreaView
                style={{
                    flex: 1
                }}>
                <View
                    style={{
                        height: 170,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
            
                    <Text>{this.props.state.authSession.email || 'desconhecido'}</Text>
                </View>
                <ScrollView>
                    <DrawerItems
                        {...this.props}
                        onItemPress={({ route, focused }) => {
                            if (focused) {
                                this.props.navigation.dispatch(DrawerActions.closeDrawer());
                            } else {
                                this.props.navigation.navigate(route.routeName);
                            }
                        }}
                    />
                    <CustomButton
                        onPress={() => {
                            this.props.navigation.dispatch(DrawerActions.closeDrawer());
                            this.props.actions.logout()
                        }}
                        title={"SAIR"}
                    />
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default connect(
    state => ({ state: state.authenticate }),
    dispatch => ({
        actions: bindActionCreators(authActions, dispatch)
    })
)(DrawerComponent);
