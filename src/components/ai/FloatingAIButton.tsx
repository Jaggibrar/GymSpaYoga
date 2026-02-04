import React, { useState } from 'react';
import AIAssistant from './AIAssistant';

const FloatingAIButton: React.FC = () => {
  return <AIAssistant isFloating={true} defaultOpen={false} />;
};

export default FloatingAIButton;
