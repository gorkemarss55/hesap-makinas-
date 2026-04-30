const calculatorEl=document.querySelector("#calculator");
const resultEl=document.querySelector(".result");
const clearAllEl=document.querySelector("#clearAll");
const deleteAcharEl=document.querySelector("#deleteAchar");
runEventListener();

let firstNumber="";
let selectedOperator="";
let afterNumber="";
let iswaitingAnewValue=false;

function runEventListener(){
    calculatorEl.addEventListener("click", write);
    clearAllEl.addEventListener("click", clearAll);
    deleteAcharEl.addEventListener("click", deleteAchar);
    window.addEventListener("keydown", handleKeyboard); 
}


function deleteAchar(){
    if(iswaitingAnewValue){
       afterNumber= Calculator.deleteCharacter(afterNumber);
    }else{
        firstNumber=Calculator.deleteCharacter(firstNumber);
    }
    resultEl.innerHTML = Calculator.deleteCharacter(resultEl.innerHTML);
}
function clearAll(){
    firstNumber="";
 selectedOperator="";
 afterNumber="";
 iswaitingAnewValue=false;
Clear();
}
function handleKeyboard(e) {
    let key = e.key;

    if (key === 'x' || key === 'X') {
        key = '*';
    }
    if (key === ',') {
        key = '.';
    }

    if ((key >= '0' && key <= '9') || key === '.') {
        if (iswaitingAnewValue) {
            afterNumber += key;
        } else {
            firstNumber += key;
        }
        upDateResultPanel(key);
    }
       
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        
        e.preventDefault(); 
        
        if (!Calculator.isHaveOperator(resultEl.innerHTML)) {
            selectedOperator = key;
            iswaitingAnewValue = true;
            upDateResultPanel(key);
        }
    }
    
    else if (key === 'Enter' || key === '=') {
        e.preventDefault(); 
        
        if (firstNumber !== "" && selectedOperator !== "" && afterNumber !== "") {
            let result = calculate(firstNumber, selectedOperator, afterNumber).toString();
            iswaitingAnewValue = false;
            Clear();
            clearOperatorAndAfterNumber();
            firstNumber = result;
            upDateResultPanel(result);
        }
    }
    
    else if (key === 'Backspace') {
        deleteAchar();
    }
    
   
    else if (key === 'Escape' || key === 'Delete') {
        clearAll();
    }
}

function write(e){
   const element=e.target;
   if(element.classList.contains("number")){
    if(iswaitingAnewValue){
        afterNumber+=element.value;
    }else{
        firstNumber+=element.value;
    }
    
    upDateResultPanel(element.value);

   }else if(element.classList.contains("operator")){
    if(!Calculator.isHaveOperator(resultEl.innerHTML)){
        selectedOperator=element.value;
        iswaitingAnewValue=true;
    upDateResultPanel(element.value);
    }
   }
   else if(element.classList.contains("equals")){
    let result=calculate(firstNumber, selectedOperator, afterNumber).toString();
    iswaitingAnewValue=false;
    Clear();
    clearOperatorAndAfterNumber()
    firstNumber=result;
    
    upDateResultPanel(result);
   }
}

function upDateResultPanel(value){
    resultEl.innerHTML+=value;
}

function calculate(firstNumber, selectedOperator, afterNumber) {
    
    const num1 = Number(firstNumber);
    const num2 = Number(afterNumber);

   
    switch (selectedOperator) {
        case "+": return num1 + num2;
        case "-": return num1 - num2;
        case "*": return num1 * num2;
        case "/": 
            // Opsiyonel: Sıfıra bölünme hatasını engellemek için ufak bir kontrol
            return num2 === 0 ? "Hata" : num1 / num2; 
        default:  return 0; // Bilinmeyen bir operatör gelirse varsayılan dönüş
    }
}

function Clear(){
    resultEl.innerHTML="";
}

function clearOperatorAndAfterNumber(){
selectedOperator="";
afterNumber="";
}