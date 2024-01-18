import { createSignal } from "solid-js";
import EmotionDisplay from "./EmotionDisplay";
import EmotionSlider from "./EmotionSlider";
import StartButton from "./StartButton";

function SessionComponent() {
  const emotions = [
    "Abandoned",
    "Admired",
    "Aggravated",
    "Agitated",
    "Alert",
    "Alone",
    "Amazed",
    "Ambivalent",
    "Amused",
    "Angry",
    "Annoyed",
    "Anxious",
    "Apathetic",
    "Apologetic",
    "Appreciated",
    "Apprehensive",
    "Aroused",
    "Ashamed",
    "Astonished",
    "Attached",
    "Attacked",
    "Attracted",
    "Awake",
    "Bewildered",
    "Bitter",
    "Blissful",
    "Bothered",
    "Brave",
    "Calm",
    "Capable",
    "Carefree",
    "Cautious",
    "Cheated",
    "Cheerful",
    "Clueless",
    "Clumsy",
    "Comfortable",
    "Committed",
    "Compassionate",
    "Competent",
    "Competitive",
    "Complacent",
    "Confident",
    "Conflicted",
    "Confused",
    "Connected",
    "Content",
    "Courageous",
    "Cranky",
    "Crazy",
    "Creative",
    "Critical",
    "Curious",
    "Cynical",
    "Defeated",
    "Defensive",
    "Delighted",
    "Dependent",
    "Depressed",
    "Desirable",
    "Desperate",
    "Destructive",
    "Detached",
    "Determined",
    "Devastated",
    "Dignified",
    "Disappointed",
    "Disbelieving",
    "Discouraged",
    "Disgusted",
    "Disheartened",
    "Dismayed",
    "Displeased",
    "Distracted",
    "Distressed",
    "Disturbed",
    "Doubtful",
    "Dramatic",
    "Dreamy",
    "Dull",
    "Eager",
    "Earnest",
    "Easygoing",
    "Ecstatic",
    "Embarrassed",
    "Empathetic",
    "Empowered",
    "Empty",
    "Encouraged",
    "Energetic",
    "Engaged",
    "Enraged",
    "Enthusiastic",
    "Envious",
    "Exasperated",
    "Excited",
    "Excluded",
    "Exhausted",
    "Expectant",
    "Exploited",
    "Exposed",
    "Exuberant",
    "Fascinated",
    "Fatigued",
    "Fearful",
    "Fulfilled",
    "Furious",
    "Generous",
    "Glad",
    "Gloomy",
    "Greedy",
    "Grieving",
    "Guilty",
    "Happy",
    "Harassed",
    "Helpless",
    "Hesitant",
    "Hopeful",
    "Horrified",
    "Hostile",
    "Humble",
    "Humiliated",
    "Hurt",
    "Hyper",
    "Impatient",
    "Impressed",
    "Inadequate",
    "Indifferent",
    "Inferior",
    "Inflamed",
    "Informed",
    "Inquisitive",
    "Insecure",
    "Inspired",
    "Insulted",
    "Interested",
    "Intimidated",
    "Intrigued",
    "Invigorated",
    "Involved",
    "Irritated",
    "Isolated",
    "Jealous",
    "Joyful",
    "Jubilant",
    "Judgmental",
    "Jumpy",
    "Lethargic",
    "Liberated",
    "Lonely",
    "Lost",
    "Loved",
    "Loving",
    "Lucky",
    "Mad",
    "Manipulated",
    "Melancholic",
    "Mellow",
    "Miserable",
    "Misunderstood",
    "Motivated",
    "Nauseated",
    "Nervous",
    "Nostalgic",
    "Obligated",
    "Obsessed",
    "Offended",
    "Optimistic",
    "Outraged",
    "Overwhelmed",
    "Panicked",
    "Paranoid",
    "Passionate",
    "Passive",
    "Patient",
    "Peaceful",
    "Pensive",
    "Perplexed",
    "Pessimistic",
    "Petrified",
    "Playful",
    "Pleased",
    "Powerless",
    "Preoccupied",
    "Proud",
    "Provoked",
    "Puzzled",
    "Questioning",
    "Quiet",
    "Rejected",
    "Relaxed",
    "Relieved",
    "Remorseful",
    "Resentful",
    "Resigned",
    "Restless",
    "Revengeful",
    "Sad",
    "Satisfied",
    "Scared",
    "Sensitive",
    "Serene",
    "Shaken",
    "Shocked",
    "Shy",
    "Sick",
    "Silly",
    "Skeptical",
    "Sleepy",
    "Smart",
    "Smug",
    "Solemn",
    "Sorrowful",
    "Sorry",
    "Spirited",
    "Stressed",
    "Strong",
    "Stunned",
    "Submissive",
    "Successful",
    "Suffering",
    "Surprised",
    "Suspicious",
    "Sympathetic",
    "Tempted",
    "Tender",
    "Tense",
    "Terrified",
    "Thankful",
    "Threatened",
    "Thrilled",
    "Tired",
    "Tormented",
    "Touched",
    "Trapped",
    "Troubled",
    "Trusting",
    "Uncomfortable",
    "Understanding",
    "Uneasy",
    "Unhappy",
    "Unique",
    "Upset",
    "Used",
    "Vengeful",
    "Vulnerable",
    "Warm",
    "Wary",
    "Weak",
    "Weary",
    "Wistful",
    "Withdrawn",
    "Worried",
    "Worthless",
    "Wronged",
    "Youthful",
    "Zealous",
  ];
  const randomizedEmotions = emotions.sort(() => Math.random() - 0.5);
  const [currentEmotionIndex, setCurrentEmotionIndex] = createSignal(0);
  const [emotionRatings, setEmotionRatings] = createSignal({});
  const [showSession, setShowSession] = createSignal(false);
  const startSession = () => setShowSession(true);
  const [sliderValue, setSliderValue] = createSignal(50);

  const handleSliderChange = (value) => {
    setEmotionRatings({
      ...emotionRatings(),
      [randomizedEmotions[currentEmotionIndex()]]: value,
    });
    setCurrentEmotionIndex(currentEmotionIndex() + 1);
    console.log(`${emotions[currentEmotionIndex()]}: ${value}`);
    setSliderValue(50);
  };

  const calculateProgress = () => {
    return (currentEmotionIndex() / emotions.length) * 100;
  };

  return (
    <div>
      {!showSession() && (
        <StartButton label="Start Session" onClick={startSession} />
      )}
      {showSession() && (
        <>
          <div
            class="progress-bar"
            style={{
              width: `${calculateProgress()}%`,
              height: "10px",
              backgroundColor: "blue !important",
            }}
          ></div>
          <EmotionDisplay emotion={() => emotions[currentEmotionIndex()]} />
          <EmotionSlider value={sliderValue()} onChange={handleSliderChange} />
        </>
      )}
    </div>
  );
}

export default SessionComponent;
