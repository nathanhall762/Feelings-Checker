import { createSignal } from "solid-js";
import EmotionsObject from "./EmotionsObject";

function SessionComponent() {
  const [currentEmotionIndex, setCurrentEmotionIndex] = createSignal(0); // does this need to be state???
  const [emotionRatings, setEmotionRatings] = createSignal({});
  const [sessionStage, setsessionStage] = createSignal(0); // maybe should not be boolean: allow for 3 stages in session

  const getAllTertiaryEmotions = (emotionsObject) => {
    let tertiaryEmotions = [];

    Object.values(emotionsObject).forEach((secondaryEmotions) => {
      Object.values(secondaryEmotions).forEach((tertiaryArray) => {
        tertiaryEmotions.push(...tertiaryArray);
      });
    });

    return tertiaryEmotions;
  };

  const randomizedEmotions = getAllTertiaryEmotions(EmotionsObject).sort(
    () => Math.random() - 0.5
  );

  const handleSliderChange = (value) => {
    setEmotionRatings({
      ...emotionRatings(),
      [randomizedEmotions[currentEmotionIndex()]]: value,
    });
    console.log(emotionRatings());
    if (currentEmotionIndex() === randomizedEmotions.length - 1) {
      setsessionStage(2);
      console.log(emotionRatings());
    } else {
      setCurrentEmotionIndex(currentEmotionIndex() + 1);
      document.getElementById("slider").value = 50;
    }
  };

  const calculateProgress = () => {
    return (currentEmotionIndex() / randomizedEmotions.length) * 100;
  };

  const aggregateScores = () => {
    let secondaryScores = {};
    let primaryScores = {};
    let tertiaryCount = {};

    // Initializing counts for each secondary and primary emotion
    Object.values(EmotionsObject).forEach((secondaryEmotions) => {
      Object.entries(secondaryEmotions).forEach(
        ([secondaryEmotion, tertiaryEmotions]) => {
          if (!secondaryScores[secondaryEmotion]) {
            secondaryScores[secondaryEmotion] = { total: 0, count: 0 };
            tertiaryCount[secondaryEmotion] = new Set(tertiaryEmotions);
          }
        }
      );
    });

    for (const [tertiaryEmotion, rating] of Object.entries(emotionRatings())) {
      for (const [primaryEmotion, secondaryEmotions] of Object.entries(
        EmotionsObject
      )) {
        for (const [secondaryEmotion, tertiaryEmotions] of Object.entries(
          secondaryEmotions
        )) {
          if (tertiaryEmotions.includes(tertiaryEmotion)) {
            // Aggregate for secondary emotions
            if (!secondaryScores[secondaryEmotion]) {
              secondaryScores[secondaryEmotion] = { total: 0, count: 0 };
            }
            secondaryScores[secondaryEmotion].total += rating;
            secondaryScores[secondaryEmotion].count++;
          }
        }
      }
    }

    // Calculate average scores for secondary emotions
    for (const [emotion, scoreData] of Object.entries(secondaryScores)) {
      scoreData.average = scoreData.total / scoreData.count;
    }

    for (const [primaryEmotion, secondaryEmotions] of Object.entries(
      EmotionsObject
    )) {
      primaryScores[primaryEmotion] = { total: 0, count: 0 };
      for (const secondaryEmotion of Object.keys(secondaryEmotions)) {
        if (secondaryScores[secondaryEmotion]) {
          primaryScores[primaryEmotion].total +=
            secondaryScores[secondaryEmotion].average;
          primaryScores[primaryEmotion].count++;
        }
      }
    }

    // Calculate average scores for primary emotions
    for (const [emotion, scoreData] of Object.entries(primaryScores)) {
      scoreData.average = scoreData.total / scoreData.count;
    }

    return {
      secondaryScores: Object.fromEntries(
        Object.entries(secondaryScores).map(([emotion, scoreData]) => [
          emotion,
          scoreData.average,
        ])
      ),
      primaryScores: Object.fromEntries(
        Object.entries(primaryScores).map(([emotion, scoreData]) => [
          emotion,
          scoreData.average,
        ])
      ),
    };
  };

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
            <progress
              class="w-full"
              value={calculateProgress()}
              max="100"
            ></progress>
            <div class="text-center p-4 mb-4 text-2xl font-bold bg-neutral-200 rounded-md">
              <span class="text-neutral-500">I feel </span>
              {randomizedEmotions[currentEmotionIndex()]}
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
        <div class="flex flex-col justify-between">
          <p class="mb-2">Session complete! Here are your results:</p>
          <div>
            <h3>
              <strong>Primary Emotions</strong>
            </h3>
            <ul>
              {Object.entries(aggregateScores().primaryScores)
                .filter(([_, score]) => score >= 5)
                .sort((a, b) => b[1] - a[1]) // Sort in descending order
                .map(([emotion, score]) => (
                  <li>
                    {emotion}: {score.toFixed(2)}
                  </li>
                ))}
            </ul>

            <h3>
              <strong>Secondary Emotions</strong>
            </h3>
            <ul>
              {Object.entries(aggregateScores().secondaryScores)
                .filter(([_, score]) => score >= 50)
                .map(([emotion, score]) => (
                  <li>
                    {emotion}: {score.toFixed(2)}
                  </li>
                ))}
            </ul>

            <h3>
              <strong>Tertiary Emotions</strong>
            </h3>
            <ul>
              {Object.entries(emotionRatings())
                .filter(([_, score]) => score >= 60)
                .sort((a, b) => b[1] - a[1]) // Sort in descending order
                .map(([emotion, score]) => (
                  <li>
                    {emotion}: {score}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SessionComponent;
