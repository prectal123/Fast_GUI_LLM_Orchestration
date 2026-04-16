import React from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

/**
 * Fast GUI LLM Orchestration - 메인 레이아웃 (밑작업)
 */
const App = () => {
  // 5가지 기본 노드의 목록 (UI에 표시될 텍스트)
  const nodeLibrary = [
    { type: 'input', label: '📥 Input Node' },
    { type: 'static', label: '📄 Static Node' },
    { type: 'concat', label: '🔗 Concat Node' },
    { type: 'llm', label: '🧠 LLM Node' },
    { type: 'output', label: '📤 Output Node' },
  ];

  return (
    <div className="workspace-container">
      {/* 1. 좌측 컨트롤 보드 (노드 팔레트) */}
      <aside className="sidebar">
        <h2>🛠 Node Palette</h2>
        <div className="node-list">
          {nodeLibrary.map((item) => (
            <div key={item.type} className="node-item">
              {item.label}
            </div>
          ))}
        </div>
      </aside>

      {/* 2. 우측 캔버스 영역 */}
      <main className="canvas-area">
        {/*
          ReactFlow의 기능 로직(노드 추가, 연결 등)은 
          현재 시점에서는 전혀 넣지 않은 빈 도화지 상태입니다.
        */}
        <ReactFlow 
          nodes={[]} 
          edges={[]} 
          fitView
        >
          {/* 눈금 표시 배경 */}
          <Background color="#cbd5e0" gap={20} />
          {/* 줌인/줌아웃 컨트롤러 */}
          <Controls />
        </ReactFlow>
      </main>
    </div>
  );
};

export default App;
