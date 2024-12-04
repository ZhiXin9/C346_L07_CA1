import React, { useState } from "react";
import { StatusBar, View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from "react-native";
import { datasource } from "./Data.js";
import { categories } from "./Categories";
import Icon from "react-native-vector-icons/FontAwesome5";
import RNPickerSelect from "react-native-picker-select";

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
    picker: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 30,
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
    cancelButton: {
        backgroundColor: "#FF5722",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

const Add = ({ navigation }) => {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("Income");

    const handleSubmit = () => {
        if (!amount || !category) {
            Alert.alert("Error", "Please fill in all fields!");
            return;
        }

        const sectionIndex = type === "Income" ? 0 : 1;

        const newItem = { key: category, amount: parseFloat(amount) };
        datasource[sectionIndex].data.push(newItem);

        navigation.navigate("Home");
    };

    return (
        <ScrollView style={{ padding: 20 }}>
            <StatusBar />

            <Text>Amount:</Text>
            <TextInput
                keyboardType="numeric"
                style={styles.input}
                value={amount}
                onChangeText={(text) => setAmount(text)}
            />

            <Text>Select Type:</Text>
            <RNPickerSelect
                style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
                onValueChange={(value) => setType(value)}
                items={[
                    { label: "Income", value: "Income" },
                    { label: "Expense", value: "Expense" },
                ]}
                value={type}
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
                        onStartShouldSetResponder={() => setCategory(cat.label)}
                    >
                        <Icon name={cat.icon} size={20} />
                        <Text style={styles.categoryText}>{cat.label}</Text>
                    </View>
                ))}
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Add;
