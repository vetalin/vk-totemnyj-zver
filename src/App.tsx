import { useState, useEffect, useCallback } from 'react';
import { ConfigProvider, AppRoot, View, Panel, PanelHeader, SplitLayout, SplitCol } from '@vkontakte/vkui';
import bridge from './bridge';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { CompatibilityScreen } from './components/CompatibilityScreen';
import { ExtendedProfileScreen } from './components/ExtendedProfileScreen';
import { questions, calculateResult, getRank } from './data/quiz';
import type { ElementType } from './types';

type Screen = 'start' | 'quiz' | 'result' | 'compatibility' | 'extended';

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<ElementType[]>([]);
  const [appearance, setAppearance] = useState<'light' | 'dark'>('dark');
  const [extendedUnlocked, setExtendedUnlocked] = useState(false);

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
    setExtendedUnlocked(false);
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
    setExtendedUnlocked(false);
  };

  const handleShowCompatibility = () => {
    setScreen('compatibility');
  };

  const handleShowExtended = () => {
    setScreen('extended');
  };

  const handleUnlockExtended = useCallback(() => {
    setExtendedUnlocked(true);
  }, []);

  const handleBack = () => {
    setScreen('result');
  };

  const result = answers.length > 0 ? calculateResult(answers) : null;
  const rank = answers.length > 0 ? getRank(answers) : null;

  const PANEL_TITLES: Record<Screen, string> = {
    start: 'Твой тотемный зверь',
    quiz: `Вопрос ${currentQuestion + 1} из ${questions.length}`,
    result: 'Результат',
    compatibility: 'Совместимость',
    extended: 'Полный профиль',
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
                    onShowCompatibility={handleShowCompatibility}
                    onShowExtended={handleShowExtended}
                    extendedUnlocked={extendedUnlocked}
                    onUnlockExtended={handleUnlockExtended}
                  />
                ) : null}
              </Panel>

              <Panel id="compatibility">
                <PanelHeader>{PANEL_TITLES.compatibility}</PanelHeader>
                {result !== null ? (
                  <CompatibilityScreen animal={result} onBack={handleBack} />
                ) : null}
              </Panel>

              <Panel id="extended">
                <PanelHeader>{PANEL_TITLES.extended}</PanelHeader>
                {result !== null && rank !== null ? (
                  <ExtendedProfileScreen animal={result} rank={rank} onBack={handleBack} />
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
