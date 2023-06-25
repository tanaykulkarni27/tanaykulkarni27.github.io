import {array,generateArray,speed} from './sort_helper.js';
import { bubble_sort } from './Algorithms/Sorting/bubble_sort.js';
import { selection_sort } from './Algorithms/Sorting/selection_sort.js';
import { quicksort } from './Algorithms/Sorting/quicksort.js';
import { insertion_sort } from './Algorithms/Sorting/insertion_sort.js';
import { merge_sort } from './Algorithms/Sorting/merge_sort.js';
import {heap_sort} from './Algorithms/Sorting/heap_sort.js';
var arr = null;
var is_sorting = false;
var previous_size = 70;
var def_params = "?type=mergesort";
$(document).ready(()=>{
    
    // Getting bar size
    var width = document.getElementById('navigation').offsetWidth * 0.7;
    width /= $('#range').val();
    width = Math.min(width,70); 
    generateArray($('#range').val(),width);
    $('#size').html($('#range').val());
    
    label_it();

    $('#range').on('input', async function (e) {
        if(is_sorting){
            document.getElementById('range').value = "" + previous_size;
            return;
        }
        previous_size = e.value;
        var width = screen.width * 0.7;
        width /= $('#range').val();
        width = Math.min(width,70);
        arr = await generateArray($('#range').val(),width);
        $('#size').html($('#range').val()); 

    });
    
    $('#sort').on('click',async ()=>{
        if(arr == null)
            arr = array;
        if(is_sorting)
            return;
        const queryParams = new URLSearchParams(def_params)
        var sorting_type = queryParams.get('type');
        is_sorting = true;
        
        if(sorting_type == 'selection')
            arr = await selection_sort(arr,speed[Math.max(0,array.length - 6)]);
        else if(sorting_type == 'bubble')
            arr = await bubble_sort(arr,speed[Math.max(0,array.length - 6)]);
        else if(sorting_type == 'quicksort')
            arr = await quicksort(arr,0,array.length - 1,speed[Math.max(0,array.length - 6)]);
        else if(sorting_type == 'insertion')
            arr = await insertion_sort(arr,speed[Math.max(0,array.length - 6)]);
        else if(sorting_type == 'mergesort'){
            document.getElementById('labels').innerHTML = `<span class="label_icon" style="background-color:yellow !important;">&nbsp;&nbsp;</span><span>Divided array part 1</span>
            <span class="label_icon" style="background-color:rgb(185,45,185) !important;">&nbsp;&nbsp;</span><span>Divided array part 2</span>`;
            arr = await merge_sort(arr,speed[Math.max(0,array.length - 6)]);
        }

        if(STYP != 'heap' && STYP != 'mergesort')
        document.getElementById('labels').innerHTML = '';
            
        else if(sorting_type == 'heap')
            arr = await heap_sort(arr,speed[Math.max(0,array.length - 6)]);
        is_sorting = false;
    });
    $('#shuffle').on('click',async ()=>{
        if(is_sorting)
            return;
        var width = document.getElementById('navigation').offsetWidth * 0.7;
        width /= $('#range').val();
        width = Math.min(width,70);
        arr = await generateArray($('#range').val(),width);  
    });

    $('#sorting_type').on('change',async (e)=>{
        def_params = "?type=" + $('#sorting_type').val();
        label_it();
    }); 

});

function label_it(){
    const QP = new URLSearchParams(def_params);
    var STYP = QP.get('type');
    document.getElementById('title').innerHTML = STYP.charAt(0).toUpperCase() + STYP.slice(1)  + " Sort Visualizer";
    if(STYP == 'selection')
        document.getElementById('ses').innerHTML = 'Selection sort Visualizer'
    else if(STYP == 'bubble')
        document.getElementById('ses').innerHTML = 'Bubble sort Visualizer'
    else if(STYP == 'quicksort')
        document.getElementById('ses').innerHTML = 'Quicksort Visualizer'
    else if(STYP == 'insertion')
        document.getElementById('ses').innerHTML = 'Insertion sort Visualizer'
    else if(STYP == 'mergesort')
        document.getElementById('ses').innerHTML = 'Mergesort Visualizer'
    else if(STYP == 'heap')
        document.getElementById('ses').innerHTML = 'Heapsort Visualizer'
    if(STYP == 'mergesort'){
        document.getElementById('labels').innerHTML = `<span class="label_icon" style="background-color:yellow !important;">&nbsp;&nbsp;</span><span>Divided array part 1</span>
        <span class="label_icon" style="background-color:rgb(185,45,185) !important;">&nbsp;&nbsp;</span><span>Divided array part 2</span>`;
    }else if(STYP == 'heap'){
        document.getElementById('labels').innerHTML = `<span class="label_icon" style="background-color:yellow !important;">&nbsp;&nbsp;</span><span>Heapifying part</span>`;
    }
    if(STYP != 'heap' && STYP != 'mergesort')
        document.getElementById('labels').innerHTML = '';
}
