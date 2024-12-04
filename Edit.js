import React, { useState, useEffect } from "react";
import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { datasource } from "./Data.js";
import { categories } from './Categories';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
    },
    categoryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 10,
    },
    categoryButton: {
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    selectedCategory: {
        backgroundColor: "#DFF2BF",
        borderColor: "#4CAF50",
    },
    unselectedCategory: {
        backgroundColor: "#F8F8F8",
        borderColor: "#CCCCCC",
    },
    categoryText: {
        marginLeft: 10,
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 10,
        borderRadius: 20,
        alignItems: "center",
    },
    saveButton: {
        backgroundColor: "#4CAF50",
    },
    deleteButton: {
        backgroundColor: "#FF5722",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

const Edit = ({ navigation, route }) => {
    const { type, index } = route.params;
    const indexnum = type === "Income" ? 0 : 1;

    const currentEntry = datasource[indexnum].data[index];

    const [amount, setAmount] = useState(currentEntry ? currentEntry.amount.toString() : "");
    const [category, setCategory] = useState(currentEntry ? currentEntry.key : "");

    useEffect(() => {
        if (!currentEntry) {
            Alert.alert("Error", "Entry not found!");
            navigation.goBack();
        }
    }, [currentEntry]);

    const handleSave = () => {
        if (!amount || !category) {
            Alert.alert("Error", "Please fill in all fields!");
            return;
        }

        currentEntry.key = category;
        currentEntry.amount = parseFloat(amount);

        navigation.navigate("Home");
    };

    const handleDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to delete this entry?", [
            {
                text: "Yes",
                onPress: () => {
                    const itemIndex = datasource[indexnum].data.findIndex(item => item.key === currentEntry.key && item.amount === currentEntry.amount);
                    if (itemIndex > -1) {
                        datasource[indexnum].data.splice(itemIndex, 1);
                    }
                    navigation.navigate("Home");
                },
            },
            { text: "No" },
        ]);
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={styles.title}>Edit {type}</Text>

            <Text>Amount:</Text>
            <TextInput
                keyboardType="numeric"
                style={styles.input}
                value={amount}
                onChangeText={(text) => setAmount(text)}
            />

            <Text>Select Category:</Text>
            <View style={styles.categoryContainer}>
                {categories.map((cat, index) => (
                    <View
                        key={index}
                        style={[
                            styles.categoryButton,
                            category === cat.label
                                ? styles.selectedCategory
                                : styles.unselectedCategory,
                        ]}
                        onStartShouldSetResponder={() => setCategory(cat.label)} // Update category on press
                    >
                        <Icon name={cat.icon} size={20} />
                        <Text style={styles.categoryText}>{cat.label}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={handleSave}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={handleDelete}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Edit;
