import { useState, useEffect } from 'react';
import { ConfigProvider, AppRoot, View, Panel, PanelHeader, SplitLayout, SplitCol } from '@vkontakte/vkui';
import bridge from './bridge';
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
    setCurrentQuestion(0);
    setAnswers([]);
    setScreen('quiz');
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

  const PANEL_TITLES: Record<Screen, string> = {
    start: 'Твой тотемный зверь',
    quiz: `Вопрос ${currentQuestion + 1} из ${questions.length}`,
    result: 'Результат',
  };

  return (
    <ConfigProvider colorScheme={appearance}>
      <AppRoot>
        <SplitLayout>
          <SplitCol>
            <View activePanel={screen}>
              <Panel id="start">
                <PanelHeader>{PANEL_TITLES.start}</PanelHeader>
                <StartScreen onStart={handleStart} />
              </Panel>

              <Panel id="quiz">
                <PanelHeader>{PANEL_TITLES.quiz}</PanelHeader>
                <QuizScreen
                  question={questions[currentQuestion]}
                  currentIndex={currentQuestion}
                  totalQuestions={questions.length}
                  onAnswer={handleAnswer}
                />
              </Panel>

              <Panel id="result">
                <PanelHeader>Твой тотем 🐾</PanelHeader>
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
