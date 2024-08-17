import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import Card from './Card';

let buttonIdCounter = 0; // Counter to ensure unique IDs for button nodes

const initialNodes = [
  {
    id: '1',
    position: { x: 250, y: 0 },
    data: { label: <Card data={{ label: 'Welcome to ABC Cafe!', buttons: ['Message', 'Image'] }} /> },
    type: 'default',
  },
];

const initialEdges = [];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Function to create a new button node
  const addButtonNode = (label, cardId) => {
    const newButtonId = `button-${buttonIdCounter++}`;
    const newNode = {
      id: newButtonId,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: label },
      type: 'default', // Custom type or styling for button nodes
    };
    setNodes((prev) => [...prev, newNode]);
    return newButtonId;
  };

  // Function to handle adding a new card node
  const addNode = () => {
    const newCardId = `card-${Date.now()}`;
    const newNode = {
      id: newCardId,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { 
        label: <Card 
                  data={{ label: `New Card`, buttons: [] }} 
                  onButtonConnect={(button, cardId) => {
                    const buttonNodeId = addButtonNode(button, cardId);
                    // Create a connection from the new button node to the card node
                    handleButtonConnect(buttonNodeId, cardId);
                  }} 
               /> 
      },
      type: 'default',
    };
    setNodes((prev) => [...prev, newNode]);
  };

  // Function to handle button-to-button connections
  //not working
  // const handleButtonConnect = (buttonId, cardId) => {
  //   const newEdge = {
  //     id: `edge-${buttonId}-${cardId}`,
  //     source: buttonId,
  //     target: cardId,
  //     type: 'default',
  //   };
  //   setEdges((eds) => [...eds, newEdge]);
  // };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      <button
        onClick={addNode}
        className="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg"
      >
        + Add Card
      </button>
    </div>
  );
}
