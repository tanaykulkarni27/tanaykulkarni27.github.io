import { swap,highlight, mark} from "../../sort_helper.js";

export async function selection_sort(array,delay_time){
    for(var i = 0;i < array.length - 1;i++){
        var act = i;
        
        await highlight(i,'rgb(185, 45, 185)',null);        
        
        if(array.length <= 15){
            mark([i],['i']);
        }

        for(var j = i + 1;j < array.length;j++){
            if(array.length <= 15){
                mark([j],['j']);
            }
            await highlight(j,'rgb(185, 45, 185)',delay_time);        

            let flag = true;

            

            if(array[j] < array[act]){
                await highlight(j,'red',delay_time);    
                flag = false;
                if(array.length <= 15){
                    if(act != i){
                        mark([act,j],['','k'])
                    }else{
                        mark([j],['k'])
                    }
                }

                act = j;
            }


            if(flag && array.length <= 15){
                mark([j],['']);
            }
            await highlight(j,'cyan',null);    
            
        }
        if(act != i){
            await swap(array[act],array[i],act,i,delay_time);
            var tmp = array[i];
            array[i] = array[act];  
            array[act] = tmp;
        }else{
            await highlight(i,'cyan',null);
        }

        if(array.length <= 15){
            mark([i,act],['','']);
        }

    }
    return array;
}