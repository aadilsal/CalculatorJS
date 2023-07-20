class Calculator{
    constructor(prevOpdtxtelem,currOpdtxtelem){
        this.prevOpdtxtelem=prevOpdtxtelem
        this.currOpdtxtelem=currOpdtxtelem
        this.clear()
    }
    clear(){
        this.currentOperand=''
        this.previousOperand=''
        this.operation=undefined
    }
    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)
    }
    appendNum(num){
        if(num==='.' && this.currentOperand.includes('.')) return
        this.currentOperand=this.currentOperand.toString()+num.toString()
    }
    chooseOperation(opr){
        if(this.currentOperand==='') return
        if(this.previousOperand!==''){
            this.compute()
        }
        this.operation=opr
        this.previousOperand=this.currentOperand
        this.currentOperand=''
    }

    compute(){
        let comp
        const prev=parseFloat(this.previousOperand)
        const crr=parseFloat(this.currentOperand)
        if(isNaN(prev)||isNaN(crr)) return
        switch(this.operation){
            case '+':
                comp=prev+crr
                break
            case '-':
                comp=prev-crr
                break
            case '*':
                comp=prev*crr
                break
            case '/':
                comp=prev/crr
                break
            default: 
                return
        }
        this.currentOperand=comp
        this.operation=undefined
        this.previousOperand=''
    }
    getDisplayNumber(num){
        const strNum=num.toString()
        const intDigit=parseFloat(strNum.split('.')[0])
        const decimalDigit=strNum.split('.')[1]
        let intDisplay

        if(isNaN(intDigit)){
            intDisplay=''
        }else{
            intDisplay=intDigit.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimalDigit!=null){
            return `${intDisplay}.${decimalDigit}`
        }
        else{
            return intDisplay
        }
    }

    updateDisplay(){
        this.currOpdtxtelem.innerText=this.getDisplayNumber(this.currentOperand)
        if(this.operation!=null){
            this.prevOpdtxtelem.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else{
            this.prevOpdtxtelem.innerText=''
        }
    }
}

const numBTN=document.querySelectorAll('[data-number]')
const oprBTN=document.querySelectorAll('[data-operation]')
const eqlBTN=document.querySelector('[data-equals]')
const delBTN=document.querySelector('[data-delete]')
const clrBTN=document.querySelector('[data-all-clear]')
const prevOpdtxtelem=document.querySelector('[data-previous-operand]')
const currOpdtxtelem=document.querySelector('[data-current-operand]')

const cal=new Calculator(prevOpdtxtelem,currOpdtxtelem)

numBTN.forEach(button =>{
    button.addEventListener('click',()=>{
        cal.appendNum(button.innerText)
        cal.updateDisplay()
    })
})

oprBTN.forEach(button =>{
    button.addEventListener('click',()=>{
        cal.chooseOperation(button.innerText)
        cal.updateDisplay()
    })
})

eqlBTN.addEventListener('click',button=>{
    cal.compute()
    cal.updateDisplay()
})

clrBTN.addEventListener('click',button =>{
    cal.clear();
    cal.updateDisplay()
})

delBTN.addEventListener('click',button =>{
    cal.delete()
    cal.updateDisplay()
})

document.addEventListener('keydown',function(event){
    let Numpattern=/[0-9]/g;
    let Opdpattern=/[+\-*\/]/g
    if(event.key.match(Numpattern)){
        event.preventDefault();
        cal.appendNum(event.key)
        cal.updateDisplay()
    }
    if(event.key==='.'){
        event.preventDefault();
        cal.appendNum(event.key)
        cal.updateDisplay()
    }
    if(event.key.match(Opdpattern)){
        event.preventDefault();
        cal.chooseOperation(event.key)
        cal.updateDisplay()
    }
    if(event.key==='Enter'|| event.key==='='){
        event.preventDefault();
        cal.compute()
        cal.updateDisplay()
    }
    if(event.key==="Backspace"){
        event.preventDefault();
        cal.delete()
        cal.updateDisplay()
    }
    if(event.key=='Delete'){
        event.preventDefault();
        cal.clear()
        cal.updateDisplay()
    }
});