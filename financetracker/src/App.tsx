import React, { useEffect, useState } from 'react'
import './App.css'
import Credit from './components/Credit'
import Header from './components/Header'
import SubHeader from './components/SubHeader'
import EntryBox from './components/EntryBox'
import SelectBox from './components/SelectBox'
import DisplayBox from './components/DisplayBox'
import NewBox from './components/NewBox'
import PopUp from './components/PopUp'

const COLOURS = [ '#C34A3C', '#CF6D62', '#DB938B', '#8D3CC3', '#B17AD6', '#3CB5C3', '#7ACDD6', '#72C33C', '#C53A93', '#4062BF', '#FF8B12', '#FBCC2E', '#3BC43C', '#CA35A2', '#4C6AD0', '#ED821C', '#FBC804' ]

var counter = 0

const initialCategories = ['National Tax', 'Province/State Tax', 'Local Tax', '401K Contribution', 'IRA Contribution', 'Health Insurance', 'Social Security', 'Housing', 'Transport', 'Utility', 'Food', 'Toiletry', 'Internet', 'Phone', 'Free Spending', 'Investment', 'Savings', 'Extra Money']
const initialData = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const App: React.FC = () => {
  // dynamic variables
  const [data, setData] = useState<number[]>(initialData)
  const [categories, setCategories] = useState<string[]>(initialCategories)
  const [colours, setColours] = useState<string[]>(COLOURS)
  const [salary, setSalary] = useState<number[]>([0, 0])

  const updateData = () => {
    // initialize variables and makes sure none are null
    const newData: number[] = []
    const newColours = [...COLOURS]
    var newSalary = [+(document.getElementById('salary') as HTMLInputElement).value, +(document.getElementById('salary') as HTMLInputElement).value]
    var deduction401k = +(document.getElementById('retirement') as HTMLInputElement).value
    if (deduction401k === 0) { deduction401k = 0 }
    var deductionIRA = +(document.getElementById('retirement_ira') as HTMLInputElement).value
    if (deductionIRA === 0) { deductionIRA = 0 }
    var fedTaxRate = (+(document.getElementById('nation_tax') as HTMLInputElement).value)/100
    if (fedTaxRate === 0) { fedTaxRate = 0 }
    var deductionTax = +(document.getElementById('deduction_tax') as HTMLInputElement).value
    if (deductionTax === 0) { deductionTax = 0 }

    // Iterate through input boxes
    Array.from(document.getElementsByClassName('Input') as HTMLCollectionOf<HTMLInputElement>).forEach(element => {
      console.log(element)
      if (element.id !== 'salary') { // filter out salary category
        if (element.id.includes('_tax')) { // taxes
          if (element.id !== 'deduction_tax') { // filter out deductions
            var tax = ((+element.value)/100)*(newSalary[0]-deduction401k-deductionTax)
            if (deduction401k <= 0 && deductionIRA > 0) {
              tax = ((+element.value)/100)*(newSalary[0]-(deductionIRA*fedTaxRate)-deductionTax)
            }
            newData.push(tax)
            newSalary[1] -= tax
          }
        }
        else if (element.id === 'socsecurity') { // social security
          var socsec = ((+element.value)/100)*newSalary[0]
          newData.push(socsec)
          newSalary[1] -= socsec
        }
        else { // normal inputs
          newData.push(+element.value)
          newSalary[1] -= (+element.value)
        }
      }
      if (element.id.includes('miscbox')) { // adds extra grey colour
        newColours.push('#ABABAB')
      }
    })

    // Display extra money
    newData.push(newSalary[1])
    newColours.push('#32A852')

    console.log(categories)

    // Set variables
    setSalary(newSalary)
    setData(newData)
    setColours(newColours)
  }

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
          (taxBox.lastChild as HTMLInputElement).value = ''
          updateData()
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
              <span id='delete${counter}' class='deleteBTN' onclick='this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)'>X</span>
            </div>
            <input id='miscbox${counter}' class='Input' type='number' step='.0001' onfocus='this.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })'></input>`
          generatedbox.addEventListener('change', () => { updateData() })
        container.appendChild(generatedbox);
        (document.getElementById(`delete${counter}`) as HTMLElement).addEventListener('click', (element) => {
          const index = categories.indexOf(input)
          categories.splice(index, 1)
          updateData()
        })

        categories.pop()
        categories.push(input)
        categories.push('Extra Money')
      }
      (document.getElementById('NewPopUp') as HTMLInputElement).value = '';
      (document.getElementById('popupholder') as HTMLSelectElement).style.display = 'none'
    });

    Array.from(document.getElementsByClassName('Input') as HTMLCollectionOf<HTMLInputElement>).forEach(element => {
      element.addEventListener('change', () => { updateData() })
    })
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
        <EntryBox id='deduction_tax' parent_class='taxboxes' label='Please Enter Total Tax Deduction:' type='number' />
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
        <DisplayBox label='Financial Breakdown' datapoints={data} datalabels={categories} datacolours={colours} datasalary={salary} />
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
