import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  snapshotEqual,
  updateDoc,
} from "firebase/firestore";
import { TextInput } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const List = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");

    //Getting updates in todos
    const suscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos: Todo[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo);
        });
        setTodos(todos);
      },
    });

    return () => suscriber();
  }, []);

  const addTodo = async () => {
    const doc = await addDoc(collection(FIRESTORE_DB, "todos"), {
      title: todo,
      done: false,
    });
    setTodo("");
  };

  const renderTodo = ({ item }: any) => {
    // Reference to each doc from firebase collection
    const ref = doc(FIRESTORE_DB, `todos/${item.id}`);
    const toggleDone = async () => {
      updateDoc(ref, { done: !item.done });
    };

    const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done && (
            <Ionicons name="md-checkmark-circle" size={24} color={"green"} />
          )}
          {!item.done && <Entypo name="circle" size={24} color="black" />}
          <Text style={styles.todoText}>{item.title}</Text>
        </TouchableOpacity>
        <Ionicons
          name="trash-bin-outline"
          size={24}
          color={"red"}
          onPress={deleteItem}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            placeholder="Add new task"
            onChangeText={(text: string) => setTodo(text)}
            value={todo}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={addTodo}
            disabled={todo === ""}
            style={{
              width: screenWidth * 0.8,
              height: 50,
              backgroundColor: "#3E1FFF",
              alignItems: "center",
              justifyContent: "center",
              borderColor: "transparent",
              borderWidth: 1,
              borderRadius: 4,
            }}
          >
            <Text style={{ color: "#fff" }}> Add Task</Text>
          </TouchableOpacity>
        </View>

        {todos.length > 0 && (
          <View>
            <FlatList
              data={todos}
              renderItem={(item) => renderTodo(item)}
              keyExtractor={(todos: Todo) => todos.id}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: screenHeight * 0.1,
  },
  form: {
    flexDirection: "column",
  },
  input: {
    height: 50,
    borderColor: "#7267CB",
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  todoContainer: {
    display: "flex",
    width: screenWidth * 0.8,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 9,
    shadowColor: "#dfdfdf",
    elevation: 20,
    backgroundColor: "#ffff",
    borderRadius: 9,
  },
  todo: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  todoText: {
    flex: 1,
    paddingHorizontal: 5,
  },
});
