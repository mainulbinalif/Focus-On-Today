const checkboxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const progressLabel = document.querySelector('.progress-label')
const errorText = document.querySelector('.error-label')
const progressValue = document.querySelector('.progress-value')


const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
    ]


// const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
//     first: {
//         name: '',
//         completed: false
//     },
//     second: {
//         name: '',
//         completed: false
//     },
//     third: {
//         name: '',
//         completed: false
//     }
// }
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

let completedGoalsCount = Object.values(allGoals).filter((goal) =>goal.completed).length
progressValue.style.width = `${completedGoalsCount / inputFields.length * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount} / ${inputFields.length} Completed`
progressLabel.innerText = allQuotes[completedGoalsCount]

checkboxList.forEach((checkbox) =>{
    checkbox.addEventListener('click', (e)=>{
        const allGoalsAdded = [...inputFields].every((input)=>{
            return input.value
        })
        
        if (allGoalsAdded) {
            checkbox.parentElement.classList.toggle('completed')
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalsCount = Object.values(allGoals).filter((goal) =>goal.completed).length

            progressValue.style.width = `${completedGoalsCount / inputFields.length * 100}%`
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} Completed`
            progressLabel.innerText = allQuotes[completedGoalsCount]

            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }else{
            errorText.classList.remove('invisible')
        }
    })
})


inputFields.forEach((input) =>{
    if (allGoals[input.id]) {
        input.value = allGoals[input.id].name


        if(allGoals[input.id].completed){
            input.parentElement.classList.add('completed')
        }
    }
    
    input.addEventListener('focus', () =>{
        errorText.classList.add('invisible')
    })

    
    input.addEventListener('input', (e) =>{

        if(allGoals[input.id] && allGoals[input.id].completed){
            e.target.value = allGoals[input.id].name
            return
        }
        
        if(allGoals[input.id]){ 
            allGoals[input.id].name = input.value
        }else{
            allGoals[input.id]= {
                name: input.value,
                completed: false
            }
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})
