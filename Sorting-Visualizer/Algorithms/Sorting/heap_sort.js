import {swap,mark, highlight, delay} from "../../sort_helper.js";

async function MarkInRange(l,u,color){
    for(var i = l;i <= u;i++){
        document.getElementById(i).style.backgroundColor = color;
    }
}

export async function heapify(array, N, ini, delay_time) {

    var largest = ini;
    var l = 2 * ini + 1
    var r = 2 * ini + 2;

let marked = [ini];

    while (l < N && array[largest] < array[l])
        largest = l;
    
    while (r < N && array[largest] < array[r])
        largest = r;
    
if(array.length <= 15){
    mark([ini],['cur']);
    mark([largest],['largest']);
    if(l < N){
        marked.push(l);
        mark([l],['l']);
    }
    if(r < N){
        marked.push(r);
        mark([r],['r']);
    }
    marked.push(largest);
}
    if (ini != largest) {
        await swap(array[ini],array[largest],ini,largest,delay_time);
        var tmp = array[ini];
        array[ini] = array[largest];
        array[largest] = tmp;

if(array.length <= 15){
    for(var x of marked)
        mark([x],[''])
}
        
        await heapify(array, N, largest, delay_time);
    }

if(array.length <= 15){
    for(var x of marked)
        mark([x],[''])
}

}

export async function heap_sort(array, delay_time) {
    var N = array.length;
    for (var i = Math.floor(N / 2) - 1; i >= 0; i--) {
        MarkInRange(i,N - 1,'yellow')
        await delay(delay_time);
        await heapify(array, N, i,delay_time);
        MarkInRange(i,N - 1,'cyan')
    }
    for (var i = N - 1; i >= 0; i--) {
        if(array.length <= 15)
            mark([0,i],[0,'i']);
        await swap(array[i],array[0],i,0,delay_time);
        if(array.length <= 15)
            mark([0,i],['','']);
        var tmp = array[0];
        array[0] = array[i];
        array[i] = tmp;
        MarkInRange(0,i - 1,'yellow')
        await delay(delay_time);
        await heapify(array, i, 0,delay_time);
        MarkInRange(0,i - 1,'cyan')
        
    }
    return array
}