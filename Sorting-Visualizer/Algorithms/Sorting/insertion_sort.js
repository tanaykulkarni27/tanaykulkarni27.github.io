import { delay,highlight,highlight_multi,swap,mark } from "../../sort_helper.js";

export async function insertion_sort(array,delay_time){
    for(var i = 1;i < array.length;i++){
        var j = i;

        mark([i],['i']);
        await highlight_multi([i],['rgb(185, 45, 185)'],delay_time);
        
        
        while(j >= 1 && array[j] < array[j - 1]){
            
            mark([j,j - 1],['j','j-1']);
            await swap(array[j],array[j - 1],j,j - 1,delay_time);
            mark([j,j - 1],['','']);
            mark([i],['i']);

            var tmp = array[j];
            array[j] = array[j - 1];
            array[j - 1] = tmp;
            j--;
        }
        
        await highlight(j,'cyan');
        if(j >= 1)
            await highlight(j - 1,'cyan');
        mark([i],['']);
    
    }
    return array;
}