import './SlidingButton.css'

function SlidingButton(props){
    return(
        <button className='SlidingButton' onClick={props.buttonFunction} >{props.buttonName}</button>
    );
}

export default SlidingButton;