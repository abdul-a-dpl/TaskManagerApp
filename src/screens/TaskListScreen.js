import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { API_URL } from '../config';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';

const TaskListScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/test/get-tasks`);
      const data = await response.json();
      if (data.status === 'success') {
        setTasks(data.tasks);
      } else {
        setError('Failed to fetch tasks');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const handleAddTask = async (title, description) => {
    try {
      const response = await fetch(`${API_URL}/test/create-task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          status: 'pending',
          priority: 'medium',
        }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        fetchTasks(); // Refresh the task list
        setModalVisible(false);
      } else {
        setError('Failed to add task');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTasks(); // Refresh the task list
      } else {
        setError('Failed to delete task');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  // Toggle task completion
  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: currentStatus === 'completed' ? 'pending' : 'completed',
        }),
      });
      if (response.ok) {
        fetchTasks(); // Refresh the task list
      } else {
        setError('Failed to update task');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onDelete={() => handleDeleteTask(item._id)}
            onToggleComplete={() => handleToggleComplete(item._id, item.status)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks found</Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default TaskListScreen; 