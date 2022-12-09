import SlidingButton from '../button/SlidingButton';
import './Description.css';
import secPhoto from '../sec.png'

function Description() {
    return (
        <div className = 'Description'>
            <header className='MainPage-header'>
                <SlidingButton buttonName = "Secura" buttonFunction = {
                    function(){
                        window.location.href = 'http://localhost:3000/undefined';
                    }
                }/>
                <SlidingButton buttonName = "О пограмме" buttonFunction = {
                    function(){
                        window.location.href = 'http://localhost:3000/undefined';
                    }
                }/>
                <SlidingButton buttonName = "Обратная связь" buttonFunction = {
                    function(){
                        window.location.href = 'http://localhost:3000/undefined';
                    }
                }/>
            </header>
            <div className='MainPageDescription'>
                <img className='mainPagePhoto' src={secPhoto}/>
                <p className='descriptionText'>Данный сайт создан, чтобы помочь вам разобраться в том, как работают некоторые алгоритмы шифрования.</p>
            </div>
        </div>
    );
}

export default Description;