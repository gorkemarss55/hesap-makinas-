class Calculator{

    static isHaveOperator(value){
        let result= false;
        for(let i=0;i<value.length;i++){
            if(this.getOperators().has(value[i])){
                result =true;
                break;
            }
        }
        return result;
    }
    static getOperators(){
        const map=new Map();
        map.set("+", "toplama");
        map.set("-", "çıkartma");
        map.set("*", "çarpma");
        map.set("/", "bölme");
        return map;
    }

    static deleteCharacter(value){
     return   value.slice(0,value.length-1);
    }
}