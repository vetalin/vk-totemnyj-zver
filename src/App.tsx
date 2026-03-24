import { useState } from 'react';
import { ConfigProvider, AppRoot, View, Panel, PanelHeader, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { questions, calculateResult } from './data/quiz';
import type { ElementType } from './types';

type Screen = 'start' | 'quiz' | 'result';

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<ElementType[]>([]);

  const handleStart = () => {
    setScreen('quiz');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (element: ElementType) => {
    const newAnswers = [...answers, element];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreen('result');
    }
  };

  const handleRestart = () => {
    setScreen('start');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const result = answers.length > 0 ? calculateResult(answers) : null;

  return (
    <ConfigProvider colorScheme="dark">
      <AppRoot>
        <SplitLayout>
          <SplitCol>
            <View activePanel={screen}>
              <Panel id="start">
                <PanelHeader>Твой тотемный зверь</PanelHeader>
                <StartScreen onStart={handleStart} />
              </Panel>

              <Panel id="quiz">
                <PanelHeader>Тест</PanelHeader>
                <QuizScreen
                  question={questions[currentQuestion]}
                  currentIndex={currentQuestion}
                  totalQuestions={questions.length}
                  onAnswer={handleAnswer}
                />
              </Panel>

              <Panel id="result">
                <PanelHeader>Результат</PanelHeader>
                {result && (
                  <ResultScreen
                    animal={result}
                    onRestart={handleRestart}
                  />
                )}
              </Panel>
            </View>
          </SplitCol>
        </SplitLayout>
      </AppRoot>
    </ConfigProvider>
  );
}

export default App;
