const checkboxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
// const errorText = document.querySelector('.error-div')
const errorText = document.querySelector('.error-label')
const progressValue = document.querySelector('.progress-value')
const goalInput = document.querySelectorAll('.goal-input')



checkboxList.forEach((checkbox) =>{
    checkbox.addEventListener('click', (e)=>{
        const allGoalsAdded = [...inputFields].every((input)=>{
            return input.value
        })
        
        if (!allGoalsAdded) {
            errorText.classList.remove('invisible')
            
        }else{
            checkbox.parentElement.classList.toggle('completed')
            progressValue.style.width = '33%'
        }
    })
})


inputFields.forEach((input) =>{
    input.addEventListener('focus', () =>{
        errorText.classList.add('invisible')
    })
})
