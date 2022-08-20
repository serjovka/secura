import SlidingButton from '../button/SlidingButton';
import './Description.css';
import secPhoto from '../sec.png'

function Description() {
    return (
        <div className = 'Description'>
            <header className='MainPage-header'>
                <SlidingButton buttonName = "Securo" buttonFunction = {
                    function(){
                        window.location.href = 'http://localhost:3000/undefined';
                    }
                }/>
                <SlidingButton buttonName = "About" buttonFunction = {
                    function(){
                        window.location.href = 'http://localhost:3000/undefined';
                    }
                }/>
                <SlidingButton buttonName = "Feedback" buttonFunction = {
                    function(){
                        window.location.href = 'http://localhost:3000/undefined';
                    }
                }/>
            </header>
            <div className='MainPageDescription'>
                <img className='mainPagePhoto' src={secPhoto}/>
                <p className='descriptionText'>Проект крутой получится, очень красивый на реакте делаем.</p>
            </div>
        </div>
    );
}

export default Description;