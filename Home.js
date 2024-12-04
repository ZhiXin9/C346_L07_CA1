import React, { useState } from "react";
import {SectionList, StyleSheet, TouchableOpacity, StatusBar, View, Text} from "react-native";
import { datasource } from "./Data.js";

const Home = ({ navigation }) => {
    const [showSummary, setShowSummary] = useState(false);

    // Calculate summary
    const calculateSummary = () => {
        const totalIncome = datasource[0].data.reduce((sum, item) => sum + item.amount, 0);
        const totalExpense = datasource[1].data.reduce((sum, item) => sum + item.amount, 0);
        const balance = totalIncome - totalExpense;
        return { totalIncome, totalExpense, balance };
    };

    const { totalIncome, totalExpense, balance } = calculateSummary();

    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() =>
                    navigation.navigate("Edit", { index: index, type: section.title, key: item.key })
                }
            >
                <Text style={styles.textStyle}>
                    {item.key} - ${item.amount}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#4CAF50" }]} // Green button
                    onPress={() => navigation.navigate("Add")}
                >
                    <Text style={styles.buttonText}>Add New</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#FF5722" }]} // Orange button
                    onPress={() => setShowSummary(true)}
                >
                    <Text style={styles.buttonText}>Show Summary</Text>
                </TouchableOpacity>
            </View>

            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgcolor } }) => (
                    <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>{title}</Text>
                )}
                keyExtractor={(item, index) => item.key + index}
            />

            {showSummary && (
                <View style={styles.popupOverlay}>
                    <View style={styles.popupBox}>
                        <Text style={styles.headerText}>Overall Summary</Text>
                        <Text>Total Income: ${totalIncome}</Text>
                        <Text>Total Expense: ${totalExpense}</Text>
                        <Text>Balance: ${balance}</Text>
                        <Text
                            style={styles.closeButton}
                            onPress={() => setShowSummary(false)}
                        >
                            Close
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: "left",
    },
    opacityStyle: {
        borderWidth: 1,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: "center",
        fontWeight: "bold",
    },
    popupOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    popupBox: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        elevation: 10,
    },
    closeButton: {
        marginTop: 10,
        color: "blue",
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Home;
