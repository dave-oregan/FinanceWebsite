import React, { useEffect } from 'react'
import './App.css'
import Credit from './components/Credit'
import Header from './components/Header'
import SubHeader from './components/SubHeader'
import EntryBox from './components/EntryBox'
import SelectBox from './components/SelectBox'
import DisplayBox from './components/DisplayBox'
import NewBox from './components/NewBox'
import PopUp from './components/PopUp'

var counter = 0

const App: React.FC = () => {
  useEffect(() => { // Calls after elements load
    (document.getElementById('popupholder') as HTMLSelectElement).style.display = 'none';
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

    // Shows popup for new expense
    (document.getElementById('newButton') as HTMLElement).addEventListener('click', () => {
      (document.getElementById('popupholder') as HTMLSelectElement).style.display = 'flex'
    });

    // Hides popup for new expense via button
    (document.getElementById('close_expense') as HTMLElement).addEventListener('click', () => {
      (document.getElementById('popupholder') as HTMLSelectElement).style.display = 'none'
    });

    // Hides popup for new expense via background
    (document.getElementById('popupbacker') as HTMLElement).addEventListener('click', () => {
      (document.getElementById('popupholder') as HTMLSelectElement).style.display = 'none'
    });

    // Adds new expense
    (document.getElementById('add_expense') as HTMLElement).addEventListener('click', () => {
      const input = (document.getElementById('NewPopUp') as HTMLInputElement).value;
      if (input.trim() !== '') {
        const container = document.getElementById('MiscHolder') as HTMLElement
          counter++
          var generatedbox = document.createElement('div')
          generatedbox.className = 'miscbox_container'
          generatedbox.innerHTML = `
            <div class='misc_label'>
              <span>${input}</span>
              <span class='deleteBTN' onclick='this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)'>X</span>
            </div>
            <input id='miscbox${counter}' class='Input' type='number' step='.0001'></input>`
        container.appendChild(generatedbox)
      }
      (document.getElementById('NewPopUp') as HTMLInputElement).value = '';
      (document.getElementById('popupholder') as HTMLSelectElement).style.display = 'none'
    });
  }, [])

  // Adds all the elements to the webstite
  return (
    <div className='Background'>
      <div className='CentrePanel'>
        <Header />
        <EntryBox id='salary' parent_class='' label='Please Enter Monthly Income:' type='number' />
        <SubHeader text='Tax' />
        <SelectBox id='tax_yn' label='Factor in Tax?' options={['Yes', 'No']} />
        <EntryBox id='nation_tax' parent_class='taxboxes' label='Please Enter National Tax:' type='number' />
        <EntryBox id='province_tax' parent_class='taxboxes' label='Please Enter Province/State Tax:' type='number' />
        <EntryBox id='local_tax' parent_class='taxboxes' label='Please Enter Local Tax:' type='number' />
        <SubHeader text='Retirement & Health' />
        <EntryBox id='retirement' parent_class='' label='Please Enter 401K Contribution:' type='number' />
        <EntryBox id='retirement_ira' parent_class='' label='Please Enter IRA Contribution:' type='number' />
        <EntryBox id='health' parent_class='' label='Please Enter Health Insurance Cost:' type='number' />
        <EntryBox id='socsecurity' parent_class='' label='Please Enter Social Security Contribution:' type='number' />
        <SubHeader text='Basic Spending' />
        <EntryBox id='housing' parent_class='' label='Please Enter Monthly Housing Cost:' type='number' />
        <EntryBox id='car' parent_class='' label='Please Enter Monthly Transport Cost:' type='number' />
        <EntryBox id='utility' parent_class='' label='Please Enter Monthly Utility Cost:' type='number' />
        <EntryBox id='food' parent_class='' label='Please Enter Monthly Food Cost:' type='number' />
        <EntryBox id='toiletries' parent_class='' label='Please Enter Monthly Toiletry Cost:' type='number' />
        <EntryBox id='internet' parent_class='' label='Please Enter Monthly Internet Cost:' type='number' />
        <EntryBox id='phone' parent_class='' label='Please Enter Monthly Phone Cost:' type='number' />
        <SubHeader text='Free Spending, Investments, & Savings' />
        <EntryBox id='spending' parent_class='' label='Please Enter Ideal Monthly Free Spending:' type='number' /> 
        <EntryBox id='invest' parent_class='' label='Please Enter Ideal Monthly Investments:' type='number' /> {/* Make it available as percent also */}
        <EntryBox id='savings' parent_class='' label='Please Enter Ideal Monthly Savings:' type='number' /> {/* Make it available as percent also */}
        <SubHeader text='Additional Costs' />
        <div id='MiscHolder'>
        {/* NewBox will add elements here */}
        <NewBox />
        </div>
        <SubHeader text='Monthly Finance Report' />
        <DisplayBox label={'display'} />
        <div className='CreditBox'>
          <Credit content='Background from ' link='https://www.freepik.com/free-photo/white-paper-texture_1034616.htm' name='Freepik' align='L'/>
          <Credit content='Created by ' link='https://horizonzz.com' name="David O'Regan" align='R'/>
        </div>
      </div>
      <PopUp id='NewPopUp' message='Please Enter Cost Name:' type='text' />
    </div>
  )
}

export default App
