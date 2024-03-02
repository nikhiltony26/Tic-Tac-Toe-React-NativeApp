import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState('');
  const [selectedCell, setSelectedCell] = useState(new Animated.Value(-1));

  const checkWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes('')) {
      setWinner('Tie');
    }
  };

  const handlePress = (index) => {
    if (winner || board[index] !== '') {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    animateCellSelection(index);

    checkWinner();
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner('');
  };

  const animateCellSelection = (index) => {
    setSelectedCell(new Animated.Value(index));

    Animated.sequence([
      Animated.timing(selectedCell, {
        toValue: index,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const renderCell = (index) => {
    const isSelected = selectedCell._value === index;
    const cellStyles = [styles.cell, isSelected && styles.selectedCell];
    return (
      <TouchableOpacity
        key={index}
        style={cellStyles}
        onPress={() => handlePress(index)}
      >
        <Text style={styles.cellText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{winner ? `${winner} wins!` : `Player ${currentPlayer}'s turn`}</Text>
      <View style={styles.board}>
        {board.map((value, index) => renderCell(index))}
      </View>
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
  },
  cell: {
    width: 80,
    height: 80,
    margin: 5,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  cellText: {
    fontSize: 40,
  },
  selectedCell: {
    backgroundColor: '#add8e6',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6495ed',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default TicTacToe;
