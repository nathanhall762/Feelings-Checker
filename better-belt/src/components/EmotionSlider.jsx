function EmotionSlider({ value, onChange }) {
    // Use the passed value prop to set the slider's position

    const handleSliderChange = (event) => {
        onChange(event.target.value);  // Call the onChange prop with the new value
    };

    return (
        <div class="p-4">
            <input
                type="range"
                min="0"
                max="100"
                value={value}  // Use the value prop for the slider's position
                onChange={handleSliderChange}
                class="slider w-full"
            />
        </div>
    );
}

export default EmotionSlider;
