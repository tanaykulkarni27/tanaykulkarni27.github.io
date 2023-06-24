import { delay, highlight, swap } from "../../sort_helper.js";

export async function merge_sort(array,delay_time){
    var a = [];
    for(var i in array){
        a.push([array[i],parseInt(i)]);
    }
    return await merge_sort_helper(a,delay_time);
}
export async function merge_sort_helper(a,delay_time){
    if(a.length <= 1){
        return a;
    }
    
    var mid = Math.floor(a.length / 2);
    var x = await merge_sort_helper(a.slice(0,mid),delay_time);
    var y = await merge_sort_helper(a.slice(mid),delay_time);

    for(var i of x){
        highlight(i[1],'yellow');
    }
    for(var i of y){
        highlight(i[1],'rgb(185, 45, 185)');
    }
    await delay(delay_time);

    var sorted_array = [];
    while(x.length != 0 && y.length != 0){
        if(x[0][0] < y[0][0]){
            sorted_array.push(x.shift());
        }else{
            x.push(y.shift());
            var i = x.length - 1;
            while(i - 1 >= 0){
                if(i - 1 == 0)
                    await swap(x[i][0],x[i - 1][0],x[i][1],x[i - 1][1],delay_time);
                else
                    await swap(x[i][0],x[i - 1][0],x[i][1],x[i - 1][1],delay_time,1);
                var tmp = x[i];
                x[i] = x[i - 1];
                x[i - 1] = tmp;

                x[i - 1][1]--;
                x[i][1]++;
                i--;
            }
            sorted_array.push(x.shift());
        }
    }

    sorted_array = sorted_array.concat(x).concat(y);


    
    for(var i of sorted_array){
        highlight(i[1],'cyan');
    }
    await delay(delay_time);
    return sorted_array;
}