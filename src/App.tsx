import { useState, useEffect } from 'react';
import { ConfigProvider, AppRoot, View, Panel, PanelHeader, SplitLayout, SplitCol } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { questions, calculateResult, getRank } from './data/quiz';
import type { ElementType } from './types';

type Screen = 'start' | 'quiz' | 'result';

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<ElementType[]>([]);
  const [appearance, setAppearance] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const getConfig = async () => {
      try {
        const data = await bridge.send('VKWebAppGetConfig') as { appearance?: 'light' | 'dark' };
        if (data.appearance) {
          setAppearance(data.appearance);
        }
      } catch (e) {
        // Use default dark theme
      }
    };
    getConfig();
  }, []);

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
  const rank = answers.length > 0 ? getRank(answers) : null;

  return (
    <ConfigProvider colorScheme={appearance}>
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
                  lastElement={answers.length > 0 ? answers[answers.length - 1] : undefined}
                  onAnswer={handleAnswer}
                />
              </Panel>

              <Panel id="result">
                <PanelHeader>Результат</PanelHeader>
                {result !== null && rank !== null ? (
                  <ResultScreen
                    animal={result}
                    rank={rank}
                    answers={answers}
                    onRestart={handleRestart}
                  />
                ) : null}
              </Panel>
            </View>
          </SplitCol>
        </SplitLayout>
      </AppRoot>
    </ConfigProvider>
  );
}

export default App;
