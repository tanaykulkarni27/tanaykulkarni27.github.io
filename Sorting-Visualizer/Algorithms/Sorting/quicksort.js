import { swap,highlight,mark} from "../../sort_helper.js";

export async function quicksort(array,l,r,delay_time){
    if(l >= r)
        return;
    
    let pivot = r;
    let x = l - 1; // j
    
    await highlight(pivot,'pink',null);

    if(array.length <= 15)
        await mark([pivot],['pivot'])

    for(var i = l;i < pivot;i++){
        if(array.length <= 15)
            await mark([i],['i']);

        await highlight(i,'rgb(185, 45, 185)',delay_time);
        

        if(array[i] < array[pivot]){
            x++;
            if(i != x){
                if(array.length <= 15)
                    mark([x,i],['j','i']);

                await swap(array[i],array[x],i,x,delay_time);

                if(array.length <= 15)
                    mark([x,i],['','i']);
            }
            var tmp = array[i];
            array[i] = array[x];
            array[x] = tmp;
        }

        await highlight(i,'cyan',null);

        if(array.length <= 15)
            await mark([i],['']);
    }

    await highlight(pivot,'cyan',null); 
    x++;
    
    if(pivot != x){
        if(array.length <= 15)
            mark([x,pivot],['j','pivot']);
        
        await highlight(x,'lightgreen',delay_time);    
        await swap(array[x],array[pivot],x,pivot,delay_time);

        if(array.length <= 15)
            await mark([x,pivot],['','']);
    }
    
    if(array.length <= 15)
        await mark([pivot],['']);

    var tmp = array[x];
    array[x] = array[pivot];
    array[pivot] = tmp;
    

    await quicksort(array,l,x - 1,delay_time);
    await quicksort(array,x + 1,r,delay_time);
    return array;
}