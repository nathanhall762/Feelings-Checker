function StartButton({ label, onClick }) {

    const handleClick = () => {
        onClick?.();
        console.log('StartButton clicked');
    };

    return (
        <button onClick={handleClick}>{label}</button>
    );
}

export default StartButton;
