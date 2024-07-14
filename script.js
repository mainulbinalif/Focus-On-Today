const checkboxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
// const errorText = document.querySelector('.error-div')
const errorText = document.querySelector('.error-label')
const progressValue = document.querySelector('.progress-value')

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

checkboxList.forEach((checkbox) =>{
    checkbox.addEventListener('click', (e)=>{
        const allGoalsAdded = [...inputFields].every((input)=>{
            return input.value
        })
        
        if (allGoalsAdded) {
            checkbox.parentElement.classList.toggle('completed')
            progressValue.style.width = '33%'
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].isCompleted = !allGoals[inputId].isCompleted
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }else{
            errorText.classList.remove('invisible')
        }
    })
})


inputFields.forEach((input) =>{
    input.value = allGoals[input.id].name

    if(allGoals[input.id].isCompleted){
        input.parentElement.classlist.add('completed')
    }

    input.addEventListener('focus', () =>{
        errorText.classList.add('invisible')
    })
    
    input.addEventListener('input', () =>{
        allGoals[input.id] = {
            name: input.value,
            isCompleted: false
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})
