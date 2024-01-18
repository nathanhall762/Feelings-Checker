function EmotionDisplay({ emotion }) {
    return (
        <div class="text-center p-4 mb-4 text-2xl font-bold bg-blue-200 rounded-md">
            {emotion()}
        </div>
    );
}

export default EmotionDisplay;
