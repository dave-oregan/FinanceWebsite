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

const COLOURS = [ '#C34A3C', '#CF6D62', '#DB938B', '#8D3CC3', '#B17AD6', '#3CB5C3', '#7ACDD6', '#E57D10', '#FF8B12', '#FFA241', '#FFB970', '#FFD0A0', '#004080', '#326699', '#DAA520', '#FBCC2E', '#B05A87' ]

var counter = 0
var amount = true

const initialCategories = ['National Tax', 'Province/State Tax', 'Local Tax', '401K Contribution', 'IRA Contribution', 'Health Insurance', 'Social Security', 'Housing', 'Transport', 'Utility', 'Food', 'Toiletry', 'Internet', 'Phone', 'Savings', 'Investment', 'Free Spending', 'Extra Money']
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
      if (element.id !== 'salary' && newSalary[0] > 0) { // filter out salary category
        if (element.id.includes('_tax')) { // taxes
          if (element.id !== 'deduction_tax') { // filter out deductions
            var tax = ((+element.value)/100)*(newSalary[0]-deduction401k-deductionTax)
            if (deduction401k <= 0 && deductionIRA > 0) {
              tax = ((+element.value)/100)*(newSalary[0]-(deductionIRA*fedTaxRate)-deductionTax)
            }
            newData.push(+tax.toFixed(2))
            newSalary[1] -= tax
          }
        }
        else if (element.id === 'socsecurity') { // social security
          var socsec = ((+element.value)/100)*newSalary[0]
          newData.push(+socsec.toFixed(2))
          newSalary[1] -= socsec
        }
        else if (element.id === 'savings' || element.id === 'invest') { // Savings and Investments
          if (amount) {
            newData.push(+parseFloat(element.value).toFixed(2))
            newSalary[1] -= (+element.value)
          }
          else {
            const percent = (+(element.value)/100)*newSalary[0]
            newData.push(+percent.toFixed(2))
            newSalary[1] -= (+element.value)
          }
        }
        else { // normal inputs
          newData.push(+parseFloat(element.value).toFixed(2))
          newSalary[1] -= (+element.value)
        }
      }
      if (element.id.includes('miscbox')) { // adds extra grey colour
        newColours.push('#ABABAB')
      }
    })

    // Display extra money
    newData.push(+newSalary[1].toFixed(2))
    newColours.push('#6AA84F')

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
            <input id='miscbox${counter}' class='Input' onchange='this.value = /^\\d*\\.?\\d*$/.test(this.value) ? this.value : (numerise(this.value.replace(/[^0-9.]/g, '')))' />`
          generatedbox.addEventListener('change', () => { updateData() })
        container.appendChild(generatedbox);
        // Updates display on delete
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

    // Adds event listener to update report dynamically
    Array.from(document.getElementsByClassName('Input') as HTMLCollectionOf<HTMLInputElement>).forEach(element => {
      element.addEventListener('change', () => { updateData() })
    });

    // Toggles savings and investments as percents
    (document.getElementById('percent_yn') as HTMLSelectElement).addEventListener('change', () => {
      const value = (document.getElementById('percent_yn') as HTMLSelectElement).value
      const sav_inv = document.querySelectorAll('.sav_inv') as NodeListOf<HTMLElement>
      sav_inv.forEach((input: HTMLElement) => {
        if (value === 'Amount') {
          (input.lastChild as HTMLInputElement).classList.remove('percent')
          amount = true
          updateData()
        } else {
          (input.lastChild as HTMLInputElement).classList.add('percent')
          amount = false
          updateData()
        }
      })
    })
  }, [])

  // Adds all the elements to the webstite
  return (
    <div className='Background'>
      <div className='CentrePanel'>
        <Header />
        <EntryBox id='salary' parent_class='' label='Please Enter Monthly Income:' />
        <SubHeader text='Tax' />
        <SelectBox id='tax_yn' label='Factor in Tax?' options={['Yes', 'No']} />
        <EntryBox id='nation_tax' parent_class='taxboxes' label='Please Enter National Tax:' />
        <EntryBox id='province_tax' parent_class='taxboxes' label='Please Enter Province/State Tax:' />
        <EntryBox id='local_tax' parent_class='taxboxes' label='Please Enter Local Tax:' />
        <EntryBox id='deduction_tax' parent_class='taxboxes' label='Please Enter Total Tax Deduction:' />
        <SubHeader text='Retirement & Health' />
        <EntryBox id='retirement' parent_class='' label='Please Enter 401K Contribution:' />
        <EntryBox id='retirement_ira' parent_class='' label='Please Enter IRA Contribution:' />
        <EntryBox id='health' parent_class='' label='Please Enter Health Insurance Cost:' />
        <EntryBox id='socsecurity' parent_class='' label='Please Enter Social Security Contribution:' />
        <SubHeader text='Basic Spending' />
        <EntryBox id='housing' parent_class='' label='Please Enter Monthly Housing Cost:' />
        <EntryBox id='car' parent_class='' label='Please Enter Monthly Transport Cost:' />
        <EntryBox id='utility' parent_class='' label='Please Enter Monthly Utility Cost:' />
        <EntryBox id='food' parent_class='' label='Please Enter Monthly Food Cost:' />
        <EntryBox id='toiletries' parent_class='' label='Please Enter Monthly Toiletry Cost:' />
        <EntryBox id='internet' parent_class='' label='Please Enter Monthly Internet Cost:' />
        <EntryBox id='phone' parent_class='' label='Please Enter Monthly Phone Cost:' />
        <SubHeader text='Free Spending, Investments, & Savings' />
        <SelectBox id='percent_yn' label='Savings and Investments as an Amount or a Percent?' options={['Amount', 'Percent']} />
        <EntryBox id='savings' parent_class='sav_inv' label='Please Enter Ideal Monthly Savings:' />
        <EntryBox id='invest' parent_class='sav_inv' label='Please Enter Ideal Monthly Investments:' />
        <EntryBox id='spending' parent_class='' label='Please Enter Ideal Monthly Free Spending:' /> 
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
