import { createSignal, createEffect } from "solid-js";
import {
  primaryEmotions,
  secondaryEmotions,
  tertiaryEmotions,
} from "./EmotionsObject";

function SessionComponent() {
  const [currentEmotionIndex, setCurrentEmotionIndex] = createSignal(0);
  const [emotionRatings, setEmotionRatings] = createSignal({});
  const [sessionStage, setsessionStage] = createSignal(0);
  const [groupedEmotions, setGroupedEmotions] = createSignal([]);

  const randomizedEmotions = [...tertiaryEmotions].sort(() => Math.random() - 0.5);

  const handleSliderChange = (value) => {
    const emotionName = randomizedEmotions[currentEmotionIndex()].name;
    setEmotionRatings({
      ...emotionRatings(),
      [emotionName]: parseInt(value, 10),
    });
    if (currentEmotionIndex() === randomizedEmotions.length - 1) {
      setsessionStage(2);
    } else {
      setCurrentEmotionIndex(currentEmotionIndex() + 1);
      document.getElementById("slider").value = 50;
    }
  };

  const calculateProgress = () => {
    return (currentEmotionIndex() / randomizedEmotions.length) * 100;
  };

  createEffect(() => {
    if (sessionStage() === 2) {
      const scores = computeScores();
      const newGroupedEmotions = mapEmotions(scores);
      console.log("Grouped Emotions:", groupedEmotions);
      setGroupedEmotions(newGroupedEmotions);
    }
  });

  function computeScores() {
    const scores = { primary: {}, secondary: {}, tertiary: { ...emotionRatings() } };
    tertiaryEmotions.forEach((tertiary) => {
      const tertiaryScore = scores.tertiary[tertiary.name] || 0;
      const secondaryEmotion = secondaryEmotions.find(se => se.id === tertiary.secondaryId);
      const primaryEmotion = primaryEmotions.find(pe => pe.id === secondaryEmotion.primaryId);

      scores.secondary[secondaryEmotion.name] = (scores.secondary[secondaryEmotion.name] || 0) + tertiaryScore;
      scores.primary[primaryEmotion.name] = (scores.primary[primaryEmotion.name] || 0) + tertiaryScore;
    });
    console.log("Computing Scores");
    return scores;
  }

  function mapEmotions(scores) {
    console.log("Mapping Emotions with Scores:", scores);
    return primaryEmotions.map(pe => ({
      ...pe,
      score: scores.primary[pe.name] || 0,
      secondaryEmotions: secondaryEmotions.filter(se => se.primaryId === pe.id).map(se => ({
        ...se,
        score: scores.secondary[se.name] || 0,
        tertiaryEmotions: tertiaryEmotions.filter(te => te.secondaryId === se.id).map(te => ({
          ...te,
          score: scores.tertiary[te.name] || 0,
        })),
      })),
    }));
  }

  return (
    <div class="p-2 rounded-lg h-fit flex flex-col justify-end mb-60">
      {sessionStage() === 0 && (
        <button onClick={() => setsessionStage(1)}>
          Click to Start Session
        </button>
      )}
      {sessionStage() === 1 && (
        <div class="h-96 flex flex-col justify-between">
          <div>
            <progress class="w-full" value={calculateProgress()} max="100"></progress>
            <div class="text-center p-4 mb-4 text-2xl font-bold bg-neutral-200 rounded-md">
              <span class="text-neutral-500">I feel </span>
              {randomizedEmotions[currentEmotionIndex()].name}
            </div>
          </div>
          <div class="flex flex-row w-full justify-between">
            <p class="text-sm">Doesn't describe how I feel at all.</p>
            <div class="p-4 w-full">
              <input
                id="slider"
                type="range"
                min="0"
                max="100"
                onChange={(e) => handleSliderChange(e.target.value)}
                class="slider w-full"
              />
            </div>
            <p class="text-sm">Perfectly describes how I feel.</p>
          </div>
        </div>
      )}
      {sessionStage() === 2 && (
        <div>
          <p class="mb-1">Session complete! Here are your results:</p>
          <div class="flex flex-col">
            {console.log("groupedEmotions:", groupedEmotions)}
            {groupedEmotions().map((primaryEmotion) => (
              <div
                key={primaryEmotion.id}
                class="flex flex-col rounded-xl p-4 shadow-lg mb-12"
                style="background: linear-gradient(#FFEEFE 30%, black);"
              >
                <p class="text-2xl font-bold">{primaryEmotion.name}: {(primaryEmotion.score || 0).toFixed(2)}</p>
                {primaryEmotion.secondaryEmotions.map((secondaryEmotion) => (
                  <div key={secondaryEmotion.id} class="flex flex-col ml-4">
                    <p class="text-xl font-bold">{secondaryEmotion.name}: {(secondaryEmotion.score || 0).toFixed(2)}</p>
                    {secondaryEmotion.tertiaryEmotions.map((tertiaryEmotion) => (
                      <p key={tertiaryEmotion.id} class="ml-4">
                        {tertiaryEmotion.name}: <sub class="text-sm">{(tertiaryEmotion.score || 0).toFixed(2)}</sub>
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SessionComponent;
