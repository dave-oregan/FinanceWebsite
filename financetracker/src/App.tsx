import React, { useEffect } from 'react'
import './App.css'
import Credit from './components/Credit'
import Header from './components/Header'
import EntryBox from './components/EntryBox'
import SelectBox from './components/SelectBox'
import DisplayBox from './components/DisplayBox'
import NewBox from './components/NewBox'


function App() {
  useEffect(() => {
    addListeners() // Calls after elements load
  }, [])

  // Adds all the elements to the webstite
  return (
    <div className='Background'>
      <div className='CentrePanel'>
        <Header />
        <EntryBox id='salary' parent_class='' label='Please Enter Monthly Income:' type='number' />
        <SelectBox id='tax_yn' label='Factor in Tax?' options={['Yes', 'No']} />
        <EntryBox id='nation_tax' parent_class='taxboxes' label='Please Enter National Tax:' type='number' />
        <EntryBox id='province_tax' parent_class='taxboxes' label='Please Enter Province/State Tax:' type='number' />
        <EntryBox id='local_tax' parent_class='taxboxes' label='Please Enter Local Tax:' type='number' />
        <EntryBox id='grocery' parent_class='' label='Please Enter Monthly Grocery Cost:' type='number' />
        <EntryBox id='water' parent_class='' label='Please Enter Monthly Water Cost:' type='number' />
        <EntryBox id='electric' parent_class='' label='Please Enter Monthly Electric Cost:' type='number' />
        <div className='MiscHolder'>
        {/* NewBox will add elements here */}
        </div>
        <NewBox />
        <div className='CreditBox'>
          <Credit content='Background from ' link='https://www.freepik.com/free-photo/white-paper-texture_1034616.htm' name='Freepik' align='L'/>
          <Credit content='Created by ' link='https://horizonzz.com' name="David O'Regan" align='R'/>
        </div>
      </div>
    </div>
  )
}

// Adds event listeners needed for program to run
function addListeners() {
  // Toggles tax sections on or off based on user input
  (document.getElementById('tax_yn') as HTMLSelectElement).addEventListener('change', () => {
    const value = (document.getElementById('tax_yn') as HTMLSelectElement).value
    const taxBoxes = document.querySelectorAll('.taxboxes') as NodeListOf<HTMLElement>

    taxBoxes.forEach((taxBox: HTMLElement) => {
      if (value === 'Yes') {
        taxBox.style.display = 'block'
      } else {
        taxBox.style.display = 'none'
      }
    })
  });

  (document.getElementById('newButton') as HTMLElement).addEventListener('click', () => {
    console.log('new')
  });
}

export default App
