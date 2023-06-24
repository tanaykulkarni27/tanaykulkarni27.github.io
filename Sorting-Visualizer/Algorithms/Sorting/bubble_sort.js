import { highlight_multi,swap,mark } from "../../sort_helper.js";

export async function bubble_sort(array,delay_time){
    for(var i = 0;i < array.length;i++){
        for(var j = 1;j < array.length - i;j++){
            var act = j - 1;
            if(array.length <= 15)
                await mark([j,j - 1],['j','j - 1']);
            await highlight_multi([j, j-1],'rgb(185, 45, 185)',delay_time);
            if(array[j] < array[act]){
                await swap(array[act],array[j],act,j,delay_time);
                var tmp = array[j];
                array[j] = array[act];  
                array[act] = tmp;
            }
            if(array.length <= 15)
                await mark([j,j - 1],['','']);
        }
    }
    return array;
}