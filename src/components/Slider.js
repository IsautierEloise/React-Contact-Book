import React, { useState } from 'react';
import SlidingPanel from 'react-sliding-side-panel';
import NewContactForm from './NewContactForm';
import { ReactComponent as AddIcon } from '../assets/images/add-icon.svg';

const Slider = () => {
    const [openPanel, setOpenPanel] = useState(false);
    
    const addContact = () => {
        if(openPanel) {
            document.querySelector('.Slider-add').classList.remove('Slider-add-open')
        } else {       
            document.querySelector('.Slider-add').classList.add('Slider-add-open')
        }

        setOpenPanel(!openPanel)
    }  

    const closePanel = () => {
        setOpenPanel(false)
    }  
    return (
        <div className="Slider">
        <button className="Slider-add" onClick={addContact}>
            <AddIcon />
        </button>
            <SlidingPanel
                type={'right'}
                size={40}   
                isOpen={openPanel}
                panelContainerClassName="Slider-container"
                panelClassName="Slider-panel"
                noBackdrop
            >                
                <NewContactForm />
            </SlidingPanel>
        </div>
    );
};
 
export default Slider;