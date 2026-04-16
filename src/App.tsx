import { useState, useEffect, useCallback } from 'react';
import { ConfigProvider, AppRoot, View, Panel, PanelHeader, SplitLayout, SplitCol } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { CompatibilityScreen } from './components/CompatibilityScreen';
import { ExtendedProfileScreen } from './components/ExtendedProfileScreen';
import { questions, calculateResult, getRank, totemAnimals } from './data/quiz';
import { loadLastResult, saveLastResult } from './utils/storage';
import type { ElementType, SavedResult } from './types';

type Screen = 'start' | 'quiz' | 'result' | 'compatibility' | 'extended';

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<ElementType[]>([]);
  const [appearance, setAppearance] = useState<'light' | 'dark'>('dark');
  const [extendedUnlocked, setExtendedUnlocked] = useState(false);
  const [resultRevealed, setResultRevealed] = useState(false);
  const [lastResult, setLastResult] = useState<SavedResult | null>(null);

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
    loadLastResult().then(setLastResult).catch(() => {});
  }, []);

  const handleStart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setExtendedUnlocked(false);
    setResultRevealed(false);
    setScreen('quiz');
  };

  const handleAnswer = (element: ElementType) => {
    const newAnswers = [...answers, element];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const animal = calculateResult(newAnswers);
      const rank = getRank(newAnswers);
      const saved: SavedResult = {
        animalId: animal.id,
        rank: rank.rank,
        rankIcon: rank.icon,
        takenAt: Date.now(),
        answers: newAnswers,
      };
      saveLastResult(saved).catch(() => {});
      setLastResult(saved);
      setScreen('result');
    }
  };

  const handleGoBack = () => {
    if (currentQuestion === 0) {
      setScreen('start');
      return;
    }
    setAnswers((prev) => prev.slice(0, -1));
    setCurrentQuestion((i) => i - 1);
  };

  const handleRestart = () => {
    setScreen('start');
    setCurrentQuestion(0);
    setAnswers([]);
    setExtendedUnlocked(false);
    setResultRevealed(false);
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

  const handleViewLastResult = () => {
    if (!lastResult) return;
    setAnswers(lastResult.answers);
    setCurrentQuestion(lastResult.answers.length - 1);
    setExtendedUnlocked(false);
    setResultRevealed(true);
    setScreen('result');
  };

  const result = answers.length > 0 ? calculateResult(answers) : null;
  const rank = answers.length > 0 ? getRank(answers) : null;
  const lastAnimal = lastResult ? totemAnimals[lastResult.animalId] : null;

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
                <StartScreen
                  onStart={handleStart}
                  lastResult={lastResult}
                  lastAnimal={lastAnimal}
                  onViewLastResult={handleViewLastResult}
                />
              </Panel>

              <Panel id="quiz">
                <PanelHeader>{PANEL_TITLES.quiz}</PanelHeader>
                <QuizScreen
                  question={questions[currentQuestion]}
                  currentIndex={currentQuestion}
                  totalQuestions={questions.length}
                  onAnswer={handleAnswer}
                  onGoBack={handleGoBack}
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
                    resultRevealed={resultRevealed}
                    onResultRevealed={() => setResultRevealed(true)}
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
