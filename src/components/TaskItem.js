import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TaskItem = ({ task, onDelete, onToggleComplete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={onToggleComplete}
      >
        <View style={[
          styles.checkbox,
          task.status === 'completed' && styles.checkboxChecked
        ]} />
        <View style={styles.textContainer}>
          <Text style={[
            styles.title,
            task.status === 'completed' && styles.completedText
          ]}>
            {task.title}
          </Text>
          {task.description ? (
            <Text style={[
              styles.description,
              task.status === 'completed' && styles.completedText
            ]}>
              {task.description}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
      >
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196F3',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteText: {
    color: '#f44336',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TaskItem; 